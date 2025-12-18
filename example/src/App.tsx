import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { WallpaperSet } from 'react-native-nitro-wallpaper';

export default function App() {
  const [url, setUrl] = useState('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80');

  const handleSetWallpaper = async () => {
    try {
      await WallpaperSet.setWallpaper(url);
      Alert.alert('Success', 'Wallpaper set successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to set wallpaper: ' + (error as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallpaper Set Example</Text>
      <TextInput
        style={styles.input}
        value={url}
        onChangeText={setUrl}
        placeholder="Enter Image URL"
      />
      <Button title="Set Wallpaper" onPress={handleSetWallpaper} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});
