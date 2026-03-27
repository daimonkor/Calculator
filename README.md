# Calculator

React Native calculator app with drawer navigation, custom fonts, and radial gradient buttons.

## Screens

- **Calculator** — basic arithmetic operations (+, -, x, /, %), sign toggle (+/-), dot, backspace
- **Issues** — accessible via drawer navigation

## Tech Stack

- React Native 0.84
- React Navigation (Drawer)
- react-native-svg (radial gradients on buttons)
- react-native-splash-screen
- TypeScript

## Getting Started

> Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide.

```sh
yarn install
```

### iOS

```sh
yarn ios
```

### Android

```sh
yarn android
```

## Scripts

| Command | Description |
|---------|-------------|
| `yarn start` | Start Metro dev server |
| `yarn ios` | Build and run on iOS |
| `yarn android` | Build and run on Android |
| `yarn test` | Run tests |
| `yarn test --coverage` | Run tests with coverage report |
| `yarn lint` | Run ESLint |

## Project Structure

```
src/
  components/     # Shared components (Header, Text)
  navigation/     # Drawer navigator setup
  screens/
    Calculator/   # Calculator screen and components
    Issues/       # Issues screen
  theme/          # Colors
  utils/          # Math evaluation, font utilities
```

## Testing

```sh
yarn test
```

Tests use `@testing-library/react-native` and cover calculator operations, navigation, and utility functions.