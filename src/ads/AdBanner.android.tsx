import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Alert, Text, View } from "react-native";
import mobileAds, {
  AdsConsent,
  AdsConsentPrivacyOptionsRequirementStatus,
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import { Button, s } from "../ui";
export const AD_UNITS = {
  banner: "ca-app-pub-6921150380725872/3680877670",
  interstitial: "ca-app-pub-6921150380725872/2367796000",
  rewarded: "ca-app-pub-6921150380725872/7736243573",
};
let initialization: Promise<boolean> | undefined;
export function prepareAds() {
  if (!initialization)
    initialization = (async () => {
      try {
        await AdsConsent.gatherConsent();
      } catch {
        /* Check prior consent. */
      }
      if (!(await AdsConsent.getConsentInfo()).canRequestAds) return false;
      await mobileAds().initialize();
      return true;
    })()
      .then((ready) => {
        if (!ready) initialization = undefined;
        return ready;
      })
      .catch(() => {
        initialization = undefined;
        return false;
      });
  return initialization;
}
export default function AdBanner() {
  const [ready, setReady] = useState(false);
  const focused = useIsFocused();
  useEffect(() => {
    let active = true;
    setReady(false);
    if (focused)
      void prepareAds()
        .then(async (value) => {
          const info = await AdsConsent.getConsentInfo();
          if (active) setReady(value && info.canRequestAds);
        })
        .catch(() => {
          if (active) setReady(false);
        });
    return () => {
      active = false;
    };
  }, [focused]);
  if (!ready || !focused) return null;
  return (
    <View style={{ alignItems: "center", gap: 6 }}>
      <Text style={s.muted}>Publicidad</Text>
      <BannerAd
        unitId={__DEV__ ? TestIds.BANNER : AD_UNITS.banner}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        onAdFailedToLoad={() => setReady(false)}
      />
    </View>
  );
}
export function AdPrivacy() {
  return (
    <Button
      secondary
      label="Preferencias de publicidad"
      onPress={() => {
        void (async () => {
          try {
            const info = await AdsConsent.requestInfoUpdate();
            if (
              info.privacyOptionsRequirementStatus ===
              AdsConsentPrivacyOptionsRequirementStatus.REQUIRED
            )
              await AdsConsent.showPrivacyOptionsForm();
            else
              Alert.alert(
                "Publicidad",
                "No hay un formulario de preferencias disponible para esta sesión.",
              );
          } catch {
            Alert.alert(
              "No disponible",
              "No se pudieron abrir las preferencias. Comprueba la conexión.",
            );
          }
        })();
      }}
    />
  );
}
