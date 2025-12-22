# Publishing Guide

This guide explains how to publish `react-native-nitro-wallpaper` to npm.

## Prerequisites

1. **npm account**: You need an npm account with access to publish the package
2. **npm token**: You need an npm CI token (automation token) for publishing

## Initial Setup: Initialize npm

Before publishing, you need to set up npm authentication. Your `package.json` is already configured, but you need to authenticate with npm.

### Quick Setup Script

Run the setup script to verify everything is ready:

```bash
./setup-npm.sh
```

This will:
- Check npm installation
- Verify package.json configuration
- Check npm authentication status
- Verify package name availability
- Check if package is built

### Manual Setup Steps

#### Step 1: Verify package.json

Your `package.json` is already configured with:
- ✅ Package name: `react-native-nitro-wallpaper`
- ✅ Version: `0.1.0`
- ✅ Publish registry: `https://registry.npmjs.org/`
- ✅ Files to include/exclude

#### Step 2: Authenticate with npm

You have two options:

**Option A: Login interactively (for manual publishing)**
```bash
npm login
```
Enter your npm username, password, and email when prompted.

**Option B: Use automation token (for CI/CD or non-interactive)**
```bash
npm config set //registry.npmjs.org/:_authToken YOUR_NPM_TOKEN
```

Replace `YOUR_NPM_TOKEN` with your npm automation token.

#### Step 3: Verify authentication

```bash
npm whoami
```

This should display your npm username if you're logged in.

#### Step 4: Check package name availability

```bash
npm view react-native-nitro-wallpaper
```

If the package doesn't exist yet, you'll get a 404 error (which is fine for a new package).
If it exists, you'll see the current version on npm.

## Setting up npm Token for GitHub Actions

### Step 1: Create an npm Automation Token

1. Go to [npmjs.com](https://www.npmjs.com/) and log in
2. Click on your profile picture → **Access Tokens**
3. Click **Generate New Token** → **Automation** (for CI/CD)
4. Copy the token (you won't be able to see it again!)

### Step 2: Add Token to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `NPM_TOKEN`
5. Value: Paste your npm automation token
6. Click **Add secret**

## Publishing Methods

### Method 1: Automated Publishing via GitHub Actions (Recommended)

1. Go to your GitHub repository
2. Navigate to **Actions** tab
3. Select **Publish to npm** workflow
4. Click **Run workflow**
5. Choose the version bump type:
   - **patch**: 0.1.0 → 0.1.1 (bug fixes)
   - **minor**: 0.1.0 → 0.2.0 (new features)
   - **major**: 0.1.0 → 1.0.0 (breaking changes)
6. Click **Run workflow**

The workflow will:
- Build the package (including Nitro modules)
- Bump the version in `package.json`
- Create a git tag
- Publish to npm
- Create a GitHub release

### Method 2: Manual Publishing from Local Machine

#### Step 1: Build the Package

```bash
yarn prepare
```

This runs the build process which includes:
- Building Nitro modules (`nitrogen`)
- Compiling TypeScript
- Building the module with `react-native-builder-bob`

#### Step 2: Authenticate with npm

```bash
npm login
```

Or if you have an automation token:

```bash
npm config set //registry.npmjs.org/:_authToken YOUR_NPM_TOKEN
```

#### Step 3: Publish

**Option A: Using release-it (Recommended)**
```bash
yarn release-it patch    # for patch version
yarn release-it minor    # for minor version
yarn release-it major    # for major version
```

**Option B: Direct npm publish**
```bash
npm publish
```

⚠️ **Note**: Direct `npm publish` won't automatically bump version or create git tags. Use `release-it` for a complete release workflow.

## What Gets Published

The following files/directories are included in the published package (as defined in `package.json` `files` field):

- `src/` - Source files
- `lib/` - Built module files
- `android/` - Android native code
- `cpp/` - C++ native code
- `nitrogen/` - Nitro generated code
- `nitro.json` - Nitro configuration
- `react-native.config.js` - React Native configuration

Excluded:
- `android/build/` - Build artifacts
- Test files (`__tests__`, `__mocks__`, etc.)
- Example app
- Development files

## Verifying the Publication

After publishing, verify the package is available:

```bash
npm view react-native-nitro-wallpaper
```

Or visit: https://www.npmjs.com/package/react-native-nitro-wallpaper

## Troubleshooting

### Error: "You do not have permission to publish"

- Make sure you're logged in to npm: `npm whoami`
- Verify you have access to publish the package name
- Check that your npm token has the correct permissions

### Error: "Package name already exists"

- The package name `react-native-nitro-wallpaper` might be taken
- You may need to use a scoped package: `@your-username/react-native-nitro-wallpaper`
- Update `package.json` with the new name

### Build fails in CI

- Ensure all dependencies are properly installed
- Check that the `prepare` script runs successfully locally
- Verify Nitro modules are generated correctly

## Version Management

The project uses [release-it](https://github.com/release-it/release-it) for version management:

- Automatically bumps version in `package.json`
- Creates git tags (e.g., `v0.1.0`)
- Generates changelog from git commits
- Creates GitHub releases

Version format follows [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

