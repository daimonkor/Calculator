import { Dimensions } from 'react-native';

export enum OrientationMode {
  PORTRAIT = 21,
  LANDSCAPE = 22,
}

export type ScreenInfo = {
  screenWidth: number;
  screenHeight: number;
  orientation: OrientationMode;
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
let _windowSize = {
  screenWidth,
  screenHeight,
  orientation:
    screenWidth <= screenHeight
      ? OrientationMode.PORTRAIT
      : OrientationMode.LANDSCAPE,
};

export const windowSize = () => {
  return _windowSize;
};
