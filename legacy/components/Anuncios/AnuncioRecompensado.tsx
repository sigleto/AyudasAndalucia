import React, { useEffect, useState } from 'react';
import { RewardedInterstitialAd, RewardedAdEventType, AdEventType, TestIds } from 'react-native-google-mobile-ads';

interface RewardedInterstitialProps {
  onRewardEarned: (reward: { type: string; amount: number }) => void;
}

const AnuncioRecompensado: React.FC<RewardedInterstitialProps> = ({ onRewardEarned }) => {
  const adUnitId = __DEV__ ? TestIds.REWARDED_INTERSTITIAL : 'ca-app-pub-6921150380725872/7736243573';
  const [rewardedInterstitial, setRewardedInterstitial] = useState<RewardedInterstitialAd | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const loadAd = async () => {
      const ad = RewardedInterstitialAd.createForAdRequest(adUnitId);
      
      const unsubscribeLoaded = ad.addAdEventListener(RewardedAdEventType.LOADED, () => {
        setLoaded(true);
        setRewardedInterstitial(ad);
      });

      const unsubscribeEarned = ad.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
        console.log('Reward earned: ', reward);
        onRewardEarned(reward);
      });

      const unsubscribeClosed = ad.addAdEventListener(AdEventType.CLOSED, () => {
        setLoaded(false);
        setRewardedInterstitial(null);
        loadAd(); // Cargar un nuevo anuncio cuando se cierra el actual
      });

      const unsubscribeFailedToLoad = ad.addAdEventListener(AdEventType.ERROR, (error) => {
        console.error('Error loading ad: ', error);
        setLoaded(false);
      });

      await ad.load();

      return () => {
        unsubscribeLoaded();
        unsubscribeEarned();
        unsubscribeClosed();
        unsubscribeFailedToLoad();
      };
    };

    loadAd();
  }, [adUnitId, onRewardEarned]);

  useEffect(() => {
    if (loaded && rewardedInterstitial) {
      rewardedInterstitial.show().catch((error) => {
        console.error('Error showing ad: ', error);
      });
    }
  }, [loaded, rewardedInterstitial]);

  return null;
};

export default AnuncioRecompensado;
