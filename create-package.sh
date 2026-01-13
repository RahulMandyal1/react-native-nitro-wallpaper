#!/bin/bash

# Script to create a distributable package for local testing
# This creates both .tgz and .zip files

PACKAGE_NAME="react-native-nitro-wallpaper"
VERSION="1.1.2"
TEMP_DIR=$(mktemp -d)
PACKAGE_DIR="$TEMP_DIR/${PACKAGE_NAME}-${VERSION}"

echo "Creating package directory..."
mkdir -p "$PACKAGE_DIR"

echo "Copying files..."

# Copy files according to package.json "files" field
# Required files
cp -r src "$PACKAGE_DIR/" 2>/dev/null || true
cp -r lib "$PACKAGE_DIR/" 2>/dev/null || true
cp -r android "$PACKAGE_DIR/" 2>/dev/null || true
cp -r nitrogen "$PACKAGE_DIR/" 2>/dev/null || true
cp nitro.json "$PACKAGE_DIR/" 2>/dev/null || true
cp react-native.config.js "$PACKAGE_DIR/" 2>/dev/null || true
cp package.json "$PACKAGE_DIR/" 2>/dev/null || true
cp README.md "$PACKAGE_DIR/" 2>/dev/null || true
cp LICENSE "$PACKAGE_DIR/" 2>/dev/null || true

# Copy cpp directory if it exists
if [ -d "cpp" ]; then
  cp -r cpp "$PACKAGE_DIR/" 2>/dev/null || true
fi

# Remove build artifacts
echo "Cleaning build artifacts..."
find "$PACKAGE_DIR" -type d -name "build" -exec rm -rf {} + 2>/dev/null || true
find "$PACKAGE_DIR" -type d -name ".gradle" -exec rm -rf {} + 2>/dev/null || true
find "$PACKAGE_DIR" -type f -name "gradlew" -delete 2>/dev/null || true
find "$PACKAGE_DIR" -type f -name "gradlew.bat" -delete 2>/dev/null || true
find "$PACKAGE_DIR" -type f -name "local.properties" -delete 2>/dev/null || true

# Create .tgz file
echo "Creating .tgz file..."
cd "$TEMP_DIR"
tar -czf "${PACKAGE_NAME}-${VERSION}.tgz" "${PACKAGE_NAME}-${VERSION}"
mv "${PACKAGE_NAME}-${VERSION}.tgz" "$OLDPWD/"

# Create .zip file
echo "Creating .zip file..."
zip -r "${PACKAGE_NAME}-${VERSION}.zip" "${PACKAGE_NAME}-${VERSION}" > /dev/null 2>&1
mv "${PACKAGE_NAME}-${VERSION}.zip" "$OLDPWD/"

# Cleanup
cd "$OLDPWD"
rm -rf "$TEMP_DIR"

echo ""
echo "✅ Package created successfully!"
echo "📦 ${PACKAGE_NAME}-${VERSION}.tgz"
echo "📦 ${PACKAGE_NAME}-${VERSION}.zip"
echo ""
echo "To test in another project:"
echo ""
echo "Method 1: Using .tgz (RECOMMENDED):"
echo "  cd /path/to/your/project"
echo "  npm install $(pwd)/${PACKAGE_NAME}-${VERSION}.tgz react-native-nitro-modules"
echo ""
echo "Method 2: Using .zip (manual extraction):"
echo "  cd /path/to/your/project"
echo "  mkdir -p node_modules/${PACKAGE_NAME}"
echo "  unzip $(pwd)/${PACKAGE_NAME}-${VERSION}.zip -d node_modules/"
echo "  mv node_modules/${PACKAGE_NAME}-${VERSION} node_modules/${PACKAGE_NAME}"
echo "  npm install react-native-nitro-modules"
echo ""
echo "⚠️  IMPORTANT: After installation, make sure to:"
echo "  1. Add WallpaperSetPackage to your MainApplication.kt"
echo "  2. Run: cd android && ./gradlew clean && cd .."
echo "  3. Run: npx react-native run-android"
