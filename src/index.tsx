import { NitroModules } from 'react-native-nitro-modules';
import { Platform } from 'react-native';
import type { WallpaperSet as WallpaperSetSpec } from './WallpaperSet.nitro';

const WallpaperSetNative =
  NitroModules.createHybridObject<WallpaperSetSpec>('WallpaperSet');

export const WallpaperSet = {
  setWallpaper: async (
    image: string,
    location: 'home' | 'lock' | 'both' = 'both'
  ): Promise<void> => {
    if (Platform.OS === 'ios') {
      throw new Error(
        'react-native-nitro-wallpaper is Android-only. iOS is not supported.'
      );
    }
    // Map location string to Android flags
    // FLAG_SYSTEM = 1
    // FLAG_LOCK = 2
    // FLAG_SYSTEM | FLAG_LOCK = 3
    let locationFlag = 3;
    switch (location) {
      case 'home':
        locationFlag = 1;
        break;
      case 'lock':
        locationFlag = 2;
        break;
      case 'both':
        locationFlag = 3;
        break;
    }
    return WallpaperSetNative.setWallpaper(image, locationFlag);
  },
};
