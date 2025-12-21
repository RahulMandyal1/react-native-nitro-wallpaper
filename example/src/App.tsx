import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  StatusBar,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import type { ImagePickerResponse, MediaType } from 'react-native-image-picker';
import { WallpaperSet } from 'react-native-nitro-wallpaper';
import { Tabs } from './components/Tabs';
import { UrlTab } from './components/UrlTab';
import { FilePathTab } from './components/FilePathTab';
import { FilePickerTab } from './components/FilePickerTab';

type Tab = 'url' | 'path' | 'picker';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('url');
  const [url, setUrl] = useState('');
  const [filePath, setFilePath] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleSetWallpaper = async (imageSource: string) => {
    if (!imageSource.trim()) {
      Alert.alert('Error', 'Please provide an image source');
      return;
    }

    setLoading(true);
    try {
      await WallpaperSet.setWallpaper(imageSource);
      Alert.alert('Success', 'Wallpaper set successfully!');
    } catch (error) {
      Alert.alert(
        'Error',
        `Failed to set wallpaper: ${(error as Error).message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePickFile = () => {
    launchImageLibrary(
      {
        mediaType: 'photo' as MediaType,
        quality: 1,
      },
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
          return;
        }
        if (response.errorMessage) {
          Alert.alert(
            'Error',
            `Failed to pick image: ${response.errorMessage}`
          );
          return;
        }
        if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          if (asset && asset.uri) {
            setSelectedFile(asset.uri);
            setPreviewImage(asset.uri);
          }
        }
      }
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'url':
        return (
          <UrlTab
            url={url}
            loading={loading}
            previewImage={previewImage}
            onUrlChange={(newUrl) => {
              setUrl(newUrl);
              setPreviewImage(newUrl || null);
            }}
            onSetWallpaper={() => handleSetWallpaper(url)}
          />
        );
      case 'path':
        return (
          <FilePathTab
            filePath={filePath}
            loading={loading}
            previewImage={previewImage}
            onFilePathChange={(path) => {
              setFilePath(path);
              setPreviewImage(path || null);
            }}
            onSetWallpaper={() => handleSetWallpaper(filePath)}
          />
        );
      case 'picker':
        return (
          <FilePickerTab
            selectedFile={selectedFile}
            loading={loading}
            previewImage={previewImage}
            onPickFile={handlePickFile}
            onSetWallpaper={() =>
              selectedFile && handleSetWallpaper(selectedFile)
            }
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.logo}>Wallpaper</Text>
          <Text style={styles.subtitle}>Set your perfect wallpaper</Text>
        </View>
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        {renderTabContent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  logo: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
  },
});
