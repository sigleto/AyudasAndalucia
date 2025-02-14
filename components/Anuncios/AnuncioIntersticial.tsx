import React, { useEffect, useState } from 'react';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const AnuncioInt: React.FC = () => {
  const adUnitId: string = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-6921150380725872/2367796000';
  const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    keywords: ['fashion', 'clothing'],
  });

  const [loaded, setLoaded] = useState<boolean>(false);
  const [shown, setShown] = useState<boolean>(false);

  useEffect(() => {
    if (shown) return; // Si ya se ha mostrado, no hacer nada

    const onAdLoaded = () => {
      setLoaded(true);
      if (!shown) {
        interstitial.show();
        setShown(true);
      }
    };

    const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, onAdLoaded);
    const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      setLoaded(false);
      setShown(true);
    });

    interstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
    };
  }, [interstitial, shown]);

  return null;
};

export default AnuncioInt;
