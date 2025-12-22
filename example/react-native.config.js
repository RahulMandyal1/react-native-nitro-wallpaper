const path = require('path');
const pkg = require('../package.json');

module.exports = {
  project: {
    ios: {
      automaticPodsInstallation: true,
    },
  },
  dependencies: {
    [pkg.name]: {
      root: path.join(__dirname, '..'),
      platforms: {
        // Codegen script incorrectly fails without this
        // So we explicitly specify the platforms with empty object
        ios: {},
        android: {
          sourceDir: path.join(__dirname, '../android'),
          packageImportPath:
            'import com.margelo.nitro.reactnativenitrowallpaper.WallpaperSetPackage;',
          packageInstance: 'new WallpaperSetPackage()',
        },
      },
    },
  },
};
