module.exports = {
  dependency: {
    platforms: {
      // Android-only package, iOS not supported
      android: {
        sourceDir: '../android',
        packageImportPath:
          'import com.margelo.nitro.reactnativenitrowallpaper.WallpaperSetPackage;',
      },
    },
  },
};
