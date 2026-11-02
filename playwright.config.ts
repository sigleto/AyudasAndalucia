import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/ui",
  timeout: 45000,
  workers: 1,
  retries: 0,
  outputDir: ".validation/playwright",
  reporter: "list",
  webServer: {
    command: "npm run test:ui:serve",
    url: "http://127.0.0.1:8082",
    reuseExistingServer: true,
    timeout: 180000,
    env: { CI: "1", EXPO_NO_TELEMETRY: "1" },
  },
  use: {
    baseURL: "http://127.0.0.1:8082",
    viewport: { width: 390, height: 844 },
    launchOptions: { channel: "chrome" },
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
});
