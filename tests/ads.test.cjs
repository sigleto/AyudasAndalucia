const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

function setup({
  consent = true,
  development = false,
  showFails = false,
} = {}) {
  let effect;
  let cleanup;
  let focused = true;
  const shown = { current: undefined };
  const ads = [];
  const exports = {};
  const appState = { currentState: "active" };
  const modules = {
    react: {
      useRef: () => shown,
      useEffect: (fn) => {
        effect = fn;
      },
    },
    "@react-navigation/native": { useIsFocused: () => focused },
    "react-native": { AppState: appState },
    "./AdBanner.android": {
      AD_UNITS: { interstitial: "production-id" },
      prepareAds: async () => consent,
    },
    "react-native-google-mobile-ads": {
      AdsConsent: { getConsentInfo: async () => ({ canRequestAds: consent }) },
      TestIds: { INTERSTITIAL: "test-id" },
      AdEventType: { LOADED: "loaded", ERROR: "error" },
      InterstitialAd: {
        createForAdRequest(id) {
          const listeners = {};
          const ad = {
            id,
            listeners,
            loads: 0,
            shows: 0,
            addAdEventListener(event, fn) {
              listeners[event] = fn;
              return () => {
                delete listeners[event];
              };
            },
            load() {
              this.loads++;
            },
            async show() {
              this.shows++;
              if (showFails) throw new Error("Unavailable");
            },
          };
          ads.push(ad);
          return ad;
        },
      },
    },
  };
  const source = fs.readFileSync(
    require.resolve("../src/ads/useGuideInterstitial.android.ts"),
    "utf8",
  );
  vm.runInNewContext(
    ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
      },
    }).outputText,
    { exports, require: (name) => modules[name], __DEV__: development },
  );
  return {
    ads,
    appState,
    start(id = "guide", focus = true) {
      cleanup?.();
      focused = focus;
      exports.useGuideInterstitial(id);
      cleanup = effect();
    },
    stop() {
      cleanup?.();
    },
  };
}
const flush = () => new Promise((resolve) => setImmediate(resolve));

test("interstitial uses production ID and shows once per guide visit", async () => {
  const h = setup();
  h.start();
  await flush();
  assert.equal(h.ads[0].id, "production-id");
  assert.equal(h.ads[0].loads, 1);
  h.ads[0].listeners.loaded();
  await flush();
  assert.equal(h.ads[0].shows, 1);
  h.start("guide", false);
  h.start();
  await flush();
  assert.equal(h.ads.length, 1);
  h.start("another-guide");
  await flush();
  assert.equal(h.ads.length, 2);
  h.stop();
});
test("development uses test ads", async () => {
  const h = setup({ development: true });
  h.start();
  await flush();
  assert.equal(h.ads[0].id, "test-id");
  h.stop();
});
test("no ad request without consent or after leaving before initialization", async () => {
  const denied = setup({ consent: false });
  denied.start();
  const departed = setup();
  departed.start();
  departed.stop();
  await flush();
  assert.equal(denied.ads.length, 0);
  assert.equal(departed.ads.length, 0);
});
test("leaving removes listeners and late loads cannot show an ad", async () => {
  const h = setup();
  h.start();
  await flush();
  const lateLoad = h.ads[0].listeners.loaded;
  h.stop();
  lateLoad();
  assert.equal(Object.keys(h.ads[0].listeners).length, 0);
  assert.equal(h.ads[0].shows, 0);
});
test("background loads and SDK errors do not interrupt the guide", async () => {
  const h = setup({ showFails: true });
  h.start();
  await flush();
  h.appState.currentState = "background";
  h.ads[0].listeners.loaded();
  assert.equal(h.ads[0].shows, 0);
  h.ads[0].listeners.error(new Error("No fill"));
  h.appState.currentState = "active";
  h.ads[0].listeners.loaded();
  await flush();
  assert.equal(h.ads[0].shows, 1);
  h.stop();
});
