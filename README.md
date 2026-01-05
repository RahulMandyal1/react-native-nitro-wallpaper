# react-native-nitro-wallpaper

Set wallpaper on React Native (Android only)

## Installation

```sh
npm install react-native-nitro-wallpaper react-native-nitro-modules
```

> `react-native-nitro-modules` is required as this library relies on [Nitro Modules](https://nitro.margelo.com/).

### Android Setup

No additional setup required. The library will be automatically linked.

> **Note:** This library is Android-only. iOS is not supported. If you try to use it on iOS, it will throw an error.

## Usage

```js
import { WallpaperSet } from 'react-native-nitro-wallpaper';

// Set wallpaper from URL (Sets both Home and Lock screens by default)
await WallpaperSet.setWallpaper('https://example.com/image.jpg');

// Set wallpaper from local file path
await WallpaperSet.setWallpaper('/storage/emulated/0/Pictures/wallpaper.jpg');

// Set wallpaper from file URI
await WallpaperSet.setWallpaper('file:///storage/emulated/0/Pictures/wallpaper.jpg');

// Set wallpaper from content URI
await WallpaperSet.setWallpaper('content://media/external/images/media/123');

// Set specific screen
await WallpaperSet.setWallpaper('https://example.com/image.jpg', 'home'); // Home screen only
await WallpaperSet.setWallpaper('https://example.com/image.jpg', 'lock'); // Lock screen only
await WallpaperSet.setWallpaper('https://example.com/image.jpg', 'both'); // Both screens
```

### Example

```jsx
import React from 'react';
import { Button, Alert } from 'react-native';
import { WallpaperSet } from 'react-native-nitro-wallpaper';

function App() {
  const handleSetWallpaper = async () => {
    try {
      await WallpaperSet.setWallpaper('https://images.unsplash.com/photo-1506744038136-46273834b3fb');
      Alert.alert('Success', 'Wallpaper set successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return <Button title="Set Wallpaper" onPress={handleSetWallpaper} />;
}
```


## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
