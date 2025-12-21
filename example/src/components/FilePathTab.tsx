import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { SetWallpaperButton } from './SetWallpaperButton';

type FilePathTabProps = {
  filePath: string;
  loading: boolean;
  previewImage: string | null;
  onFilePathChange: (path: string) => void;
  onSetWallpaper: () => void;
};

export function FilePathTab({
  filePath,
  loading,
  previewImage,
  onFilePathChange,
  onSetWallpaper,
}: FilePathTabProps) {
  return (
    <View style={styles.tabContent}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>File Path</Text>
        <TextInput
          style={styles.input}
          value={filePath}
          onChangeText={onFilePathChange}
          placeholder="/storage/emulated/0/Pictures/image.jpg"
          placeholderTextColor="#666"
          autoCapitalize="none"
        />
      </View>

      {previewImage && (
        <View style={styles.previewContainer}>
          <Image
            source={{
              uri: previewImage.startsWith('file://')
                ? previewImage
                : `file://${previewImage}`,
            }}
            style={styles.previewImage}
            resizeMode="cover"
          />
          <View style={styles.previewOverlay}>
            <Text style={styles.previewText}>Preview</Text>
          </View>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <SetWallpaperButton loading={loading} onPress={onSetWallpaper} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContent: {
    paddingHorizontal: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#fff',
  },
  previewContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  previewImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#1a1a1a',
  },
  previewOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  previewText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 20,
  },
});
