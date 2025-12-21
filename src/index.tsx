import { NitroModules } from 'react-native-nitro-modules';
import { Platform } from 'react-native';
import type { WallpaperSet as WallpaperSetSpec } from './WallpaperSet.nitro';

const WallpaperSetNative =
  NitroModules.createHybridObject<WallpaperSetSpec>('WallpaperSet');

export const WallpaperSet = {
  setWallpaper: async (image: string): Promise<void> => {
    if (Platform.OS === 'ios') {
      throw new Error(
        'react-native-nitro-wallpaper is Android-only. iOS is not supported.'
      );
    }
    return WallpaperSetNative.setWallpaper(image);
  },
};
