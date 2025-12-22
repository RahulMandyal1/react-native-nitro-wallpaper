# react-native-nitro-wallpaper Example

This is an example app demonstrating how to use [`react-native-nitro-wallpaper`](../README.md) to set wallpapers on Android devices.

## Features

This example app showcases three different ways to set wallpapers:

- **URL Tab**: Set wallpaper from a remote image URL
- **File Path Tab**: Set wallpaper from a local file path
- **File Picker Tab**: Pick an image from your device and set it as wallpaper

## Prerequisites

> **Note**: Make sure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

- Node.js >= 20
- Android development environment set up
- Android device or emulator

## Installation

This example app is part of a monorepo. From the root directory, install dependencies:

```sh
# Using npm
npm install

# OR using Yarn
yarn install
```

## Running the Example

### Step 1: Start Metro

From the root of the project, start the Metro bundler:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

### Step 2: Run on Android

With Metro running, open a new terminal window/pane and run:

```sh
# From the root directory
npm run example android

# OR using Yarn
yarn example android

# OR navigate to the example directory
cd example
npm run android
# OR
yarn android
```

> **Note:** This library is Android-only. iOS is not supported.

If everything is set up correctly, you should see the example app running in the Android Emulator or your connected device.

## Usage

The example app demonstrates how to use the `WallpaperSet` API:

```tsx
import { WallpaperSet } from 'react-native-nitro-wallpaper';

// Set wallpaper from URL
await WallpaperSet.setWallpaper('https://example.com/image.jpg');

// Set wallpaper from local file path
await WallpaperSet.setWallpaper('/storage/emulated/0/Pictures/wallpaper.jpg');

// Set wallpaper from file URI
await WallpaperSet.setWallpaper('file:///storage/emulated/0/Pictures/wallpaper.jpg');
```

## Project Structure

- `src/App.tsx` - Main app component with tab navigation
- `src/components/` - Reusable components for each tab
  - `Tabs.tsx` - Tab navigation component
  - `UrlTab.tsx` - URL input tab
  - `FilePathTab.tsx` - File path input tab
  - `FilePickerTab.tsx` - Image picker tab
  - `SetWallpaperButton.tsx` - Button component for setting wallpaper

## Learn More

- [Main Library README](../README.md) - Full documentation for `react-native-nitro-wallpaper`
- [React Native Documentation](https://reactnative.dev/docs/getting-started) - Learn more about React Native
- [Nitro Modules](https://nitro.margelo.com/) - Learn about the Nitro Modules architecture
