module.exports = {
  dependencies: {
    // The original project only supplies an Android AdMob application ID.
    // Do not initialize an unconfigured iOS ads SDK.
    "react-native-google-mobile-ads": { platforms: { ios: null } },
  },
};
