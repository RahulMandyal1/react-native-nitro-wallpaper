import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SetWallpaperButton } from './SetWallpaperButton';

type FilePickerTabProps = {
  selectedFile: string | null;
  loading: boolean;
  previewImage: string | null;
  onPickFile: () => void;
  onSetWallpaper: () => void;
};

export function FilePickerTab({
  selectedFile,
  loading,
  previewImage,
  onPickFile,
  onSetWallpaper,
}: FilePickerTabProps) {
  return (
    <View style={styles.tabContent}>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={onPickFile}
        activeOpacity={0.8}
      >
        <Text style={styles.pickerIcon}>📷</Text>
        <Text style={styles.pickerButtonText}>Choose from Gallery</Text>
        <Text style={styles.pickerSubtext}>
          Select an image from your device
        </Text>
      </TouchableOpacity>

      {previewImage && (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: previewImage }}
            style={styles.previewImage}
            resizeMode="cover"
          />
          <View style={styles.previewOverlay}>
            <Text style={styles.previewText}>Preview</Text>
          </View>
          {selectedFile && (
            <View style={styles.fileInfo}>
              <Text style={styles.fileName} numberOfLines={1}>
                {selectedFile.split('/').pop()}
              </Text>
            </View>
          )}
        </View>
      )}

      {selectedFile && (
        <View style={styles.buttonContainer}>
          <SetWallpaperButton loading={loading} onPress={onSetWallpaper} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContent: {
    paddingHorizontal: 24,
  },
  pickerButton: {
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#2a2a2a',
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 20,
  },
  pickerIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  pickerButtonText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  pickerSubtext: {
    color: '#888',
    fontSize: 14,
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
    height: 400,
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
  fileInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 16,
  },
  fileName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  buttonContainer: {
    marginTop: 20,
  },
});
