import { NitroModules } from 'react-native-nitro-modules';
import type { WallpaperSet as WallpaperSetSpec } from './WallpaperSet.nitro';

export const WallpaperSet =
  NitroModules.createHybridObject<WallpaperSetSpec>('WallpaperSet');

