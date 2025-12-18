# Contributing

Contributions are welcome! Please follow these guidelines.

## Getting Started

1. Install dependencies:
```sh
yarn
```

2. Generate Nitro code (required for first run):
```sh
yarn nitrogen
```

3. Run the example app:
```sh
yarn example android
```

> **Note:** This library is Android-only. iOS is not supported.

## Development

- Make sure code passes TypeScript: `yarn typecheck`
- Check linting: `yarn lint`
- Run tests: `yarn test`

## Commit Messages

Follow [conventional commits](https://www.conventionalcommits.org/):
- `fix`: bug fixes
- `feat`: new features
- `docs`: documentation changes
- `chore`: tooling/maintenance

## Pull Requests

- Keep PRs focused on one change
- Ensure tests and linters pass
- Update documentation as needed
