import type { HybridObject } from 'react-native-nitro-modules';

export interface WallpaperSet
  extends HybridObject<{ ios: 'swift'; android: 'kotlin' }> {
  setWallpaper(image: string): Promise<void>;
}
