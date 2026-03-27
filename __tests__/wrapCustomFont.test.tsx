import { font_style_generator, wrapCustomFont } from '../src/utils';
import { Platform } from 'react-native';

describe('font_style_generator', () => {
  it('generates Regular for normal weight', () => {
    const result = font_style_generator('Roboto', 'normal', 'normal');
    expect(result.fontFamily).toBe('Roboto-Regular');
    expect(result.fontWeight).toBe('normal');
  });

  it('generates Bold for bold weight', () => {
    const result = font_style_generator('Roboto', 'bold', 'normal');
    expect(result.fontFamily).toBe('Roboto-Bold');
  });

  it('generates Thin for 100', () => {
    expect(font_style_generator('Roboto', '100', 'normal').fontFamily).toBe(
      'Roboto-Thin',
    );
  });

  it('generates Ultralight for 200', () => {
    expect(font_style_generator('Roboto', '200', 'normal').fontFamily).toBe(
      'Roboto-Ultralight',
    );
  });

  it('generates Light for 300', () => {
    expect(font_style_generator('Roboto', '300', 'normal').fontFamily).toBe(
      'Roboto-Light',
    );
  });

  it('generates Medium for 500', () => {
    expect(font_style_generator('Roboto', '500', 'normal').fontFamily).toBe(
      'Roboto-Medium',
    );
  });

  it('generates Semibold for 600', () => {
    expect(font_style_generator('Roboto', '600', 'normal').fontFamily).toBe(
      'Roboto-Semibold',
    );
  });

  it('generates Heavy for 800', () => {
    expect(font_style_generator('Roboto', '800', 'normal').fontFamily).toBe(
      'Roboto-Heavy',
    );
  });

  it('generates Black for 900', () => {
    expect(font_style_generator('Roboto', '900', 'normal').fontFamily).toBe(
      'Roboto-Black',
    );
  });

  it('generates Regular for bolder', () => {
    expect(font_style_generator('Roboto', 'bolder', 'normal').fontFamily).toBe(
      'Roboto-Regular',
    );
  });

  it('generates Bold for 700', () => {
    expect(font_style_generator('Roboto', '700', 'normal').fontFamily).toBe(
      'Roboto-Bold',
    );
  });

  it('appends Italic for italic style', () => {
    const result = font_style_generator('Roboto', 'bold', 'italic');
    expect(result.fontFamily).toBe('Roboto-BoldItalic');
  });
});

describe('wrapCustomFont', () => {
  it('returns style with split font family on iOS', () => {
    Platform.OS = 'ios';
    const result = wrapCustomFont({ fontFamily: 'Roboto', fontWeight: '400' });
    expect(result.fontFamily).toBe('Roboto');
  });

  it('returns style unchanged for non-custom font on iOS', () => {
    Platform.OS = 'ios';
    const result = wrapCustomFont({ fontFamily: 'Arial', fontWeight: '400' });
    expect(result.fontFamily).toBe('Arial');
  });

  it('generates font family on Android for known font', () => {
    Platform.OS = 'android';
    const result = wrapCustomFont({ fontFamily: 'Roboto', fontWeight: '400' });
    expect(result.fontFamily).toBe('Roboto-Regular');
  });

  it('returns original style on Android for unknown font', () => {
    Platform.OS = 'android';
    const style = { fontFamily: 'UnknownFont', fontWeight: '400' as const };
    const result = wrapCustomFont(style);
    expect(result).toEqual(style);
  });

  it('uses default weight 400 on Android when not specified', () => {
    Platform.OS = 'android';
    const result = wrapCustomFont({ fontFamily: 'Roboto' });
    expect(result.fontFamily).toBe('Roboto-Regular');
  });
});
