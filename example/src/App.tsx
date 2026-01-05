import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import type { ImagePickerResponse, MediaType } from 'react-native-image-picker';
import { WallpaperSet } from 'react-native-nitro-wallpaper';
import { Tabs } from './components/Tabs';
import { UrlTab } from './components/UrlTab';
import { FilePathTab } from './components/FilePathTab';
import { FilePickerTab } from './components/FilePickerTab';

type Tab = 'url' | 'path' | 'picker';
type Location = 'home' | 'lock' | 'both';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('url');
  const [url, setUrl] = useState('');
  const [filePath, setFilePath] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [location, setLocation] = useState<Location>('both');

  const handleSetWallpaper = async (imageSource: string) => {
    if (!imageSource.trim()) {
      Alert.alert('Error', 'Please provide an image source');
      return;
    }

    setLoading(true);
    try {
      await WallpaperSet.setWallpaper(imageSource, location);
      Alert.alert('Success', `Wallpaper set to ${location} successfully!`);
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

  const renderLocationSelector = () => (
    <View style={styles.selectorContainer}>
      <Text style={styles.selectorLabel}>Set for:</Text>
      <View style={styles.selectorButtons}>
        {(['home', 'lock', 'both'] as Location[]).map((loc) => (
          <TouchableOpacity
            key={loc}
            onPress={() => setLocation(loc)}
            style={[
              styles.selectorButton,
              location === loc && styles.selectorButtonActive,
            ]}
          >
            <Text
              style={[
                styles.selectorText,
                location === loc && styles.selectorTextActive,
              ]}
            >
              {loc.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

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
        {renderLocationSelector()}
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
  selectorContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  selectorLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  selectorButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  selectorButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    alignItems: 'center',
  },
  selectorButtonActive: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  selectorText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '700',
  },
  selectorTextActive: {
    color: '#000',
  },
});
