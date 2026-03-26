import { Platform, StyleSheet } from 'react-native';

export type FontStyle = 'normal' | 'italic' | 'oblique';
export type FontWeight =
  | 'normal'
  | 'bold'
  | 'bolder'
  | 'lighter'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

// FIXME: This function is hideous
function double_pascal_case_to_two_words(str: string) {
  let index;
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    let ch = str.charAt(i);
    if (ch >= 'A' && ch <= 'Z') {
      count++;
    }
    if (count === 2 && !index) {
      index = i;
    }
  }
  if (count === 2) {
    return str.substr(0, index) + ' ' + str.substring(index ?? 0, str.length);
  } else {
    return str;
  }
}

export function font_style_generator(
  font_family: string,
  font_weight: FontWeight,
  font_style: FontStyle,
): { fontFamily?: string; fontWeight: string } {
  let fontFamily = `${font_family}-`;

  switch (font_weight) {
    case 'normal':
      fontFamily += 'Regular';
      break;
    case 'bold':
      fontFamily += 'Bold';
      break;
    case '100':
      fontFamily += 'Thin';
      break;
    case '200':
      fontFamily += 'Ultralight';
      break;
    case '300':
      fontFamily += 'Light';
      break;
    case '400':
      fontFamily += 'Regular';
      break;
    case '500':
      fontFamily += 'Medium';
      break;
    case '600':
      fontFamily += 'Semibold';
      break;
    case '700':
      fontFamily += 'Bold';
      break;
    case '800':
      fontFamily += 'Heavy';
      break;
    case '900':
      fontFamily += 'Black';
      break;
    case 'bolder':
    case 'lighter':
    // @ts-ignore
    case 'default':
      fontFamily += 'Regular';
      break;
  }

  if (font_style === 'italic') {
    fontFamily += 'Italic';
  }
  return {
    ...(font_family && { fontFamily: fontFamily }),
    fontWeight: font_weight ?? '400',
  };
}

class FontManager {
  customFonts: string[] = [];

  init = (...customFonts: string[]) => {
    this.customFonts = customFonts;
  };

  override = (args: any) => {
    const originStyle = args;
    if (Platform.OS === 'android') {
      if (originStyle) {
        const style = StyleSheet.flatten([originStyle]);
        const fontFamilyMod = style.fontFamily?.split(' ')?.join('');
        if (!this.customFonts?.includes(fontFamilyMod)) {
          return originStyle;
        }
        const fontWeight: FontWeight = originStyle.fontWeight
          ? originStyle.fontWeight
          : '400';
        const fontStyle: FontStyle = originStyle.fontStyle
          ? originStyle.fontStyle
          : 'normal';
        // HACK: Disabled mutation of fontStyle as is immutable in some libaries
        const fontFamily: string = fontFamilyMod;
        return StyleSheet.flatten([
          style,
          font_style_generator(fontFamily, fontWeight, fontStyle),
        ]);
      }
    } else {
      const style = StyleSheet.flatten([originStyle]);
      if (originStyle) {
        if (style.fontFamily && this.customFonts?.includes(style.fontFamily)) {
          const fontFamily: string = style.fontFamily;
          style.fontFamily = double_pascal_case_to_two_words(fontFamily);
        }
      }
      return style;
    }
  };
}

const fontManager = new FontManager();
fontManager.init('Arimo');

export const wrapCustomFont = fontManager.override.bind(fontManager);
