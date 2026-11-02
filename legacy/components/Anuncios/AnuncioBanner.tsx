import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

interface BannerAdProps {
  adUnitId?: string; // Permite personalizar el adUnitId si es necesario
  size?: BannerAdSize; // Permite personalizar el tamaño del banner
}

const AnuncioBan: React.FC<BannerAdProps> = ({
  adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-6921150380725872/3680877670',
  size = BannerAdSize.ANCHORED_ADAPTIVE_BANNER,
}) => {
  return (
    <View style={styles.container}>
      <BannerAd unitId={adUnitId} size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default AnuncioBan;
