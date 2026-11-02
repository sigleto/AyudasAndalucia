import { useEffect, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";
import { AppState } from "react-native";
import {
  AdsConsent,
  AdEventType,
  InterstitialAd,
  TestIds,
} from "react-native-google-mobile-ads";
import { AD_UNITS, prepareAds } from "./AdBanner.android";

// One interstitial per guide visit, independent of the questionnaire stage.
export function useGuideInterstitial(guideId: string) {
  const focused = useIsFocused();
  const shown = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (!focused || shown.current === guideId) return;
    let active = true;
    let unsubscribe = () => {};
    void (async () => {
      if (!(await prepareAds()) || !active) return;
      if (!(await AdsConsent.getConsentInfo()).canRequestAds || !active) return;
      const ad = InterstitialAd.createForAdRequest(
        __DEV__ ? TestIds.INTERSTITIAL : AD_UNITS.interstitial,
      );
      const offLoaded = ad.addAdEventListener(AdEventType.LOADED, () => {
        if (!active || AppState.currentState !== "active") return;
        shown.current = guideId;
        void ad.show().catch(() => {
          // A failed ad must never prevent use of the guide.
          shown.current = undefined;
        });
      });
      const offError = ad.addAdEventListener(AdEventType.ERROR, () => {});
      unsubscribe = () => {
        offLoaded();
        offError();
      };
      ad.load();
    })().catch(() => {});
    return () => {
      active = false;
      unsubscribe();
    };
  }, [focused, guideId]);
}
