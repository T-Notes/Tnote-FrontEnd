import { css, DefaultTheme } from 'styled-components';

const colors = {
  blue000: '#F5F6FF',
  blue100: '#EFF1FF',
  blue200: '#DAE0FFE5',
  blue300: '#C4CDFFCC',
  blue400: '#F7F9FC',
  blue500: '#E6F6FC',
  blue600: '#3378FF',
  blue700: '#0EA5E9',
  purple000: '#5000BC',
  purple100: '#632CFA',
  purple200: '#F0EBFF',
  purple300: '#BAA2FC',
  purple400: '#7F51FC',
  gray000: '#5B5B5B',
  gray100: '#A6A6A6',
  gray200: '#E8E8E8',
  gray300: '#F3F3F3',
  gray400: '#666666',
  gray500: '#0000004D',
  gray600: '#D5D5D5',
  gray700: '#2F2F2F',
  gray800: '#444444',
  gray900: '#D9D9D9',
  gray1000: '#5E5E5E',
  gray1100: '#F8F8F8;',
  red000: '#FF6F6F',
  red100: '#FFD9DC',
  red200: '#DC2626',
  white: '#FFFFFF',
  black: '#000000',
  green000: '#2DD4BF',
  green100: '#E6FEE7',
  yellow000: '#F59E0B',
  yellow100: '#FEF5E6',
  yellow200: '#FEE500',
  pink000: '#FEE6F9',
  pink100: '#DC2DB5',
};

interface FontProps {
  weight: 400 | 500 | 600 | 700 | 800;
  size: number;
  height: number;
}

const FONT = ({ weight, size, height }: FontProps) => {
  return css`
    font-family: Pretendard;
    font-style: normal;
    font-size: ${size}px;
    font-weight: ${weight};
    line-height: ${height}px;
  `;
};

const fonts = {
  h1: FONT({ weight: 700, size: 48, height: 70 }),
  h2: FONT({ weight: 600, size: 24, height: 29 }),
  h3: FONT({ weight: 600, size: 32, height: 65 }),
  button: FONT({ weight: 500, size: 24, height: 29 }),
  button1: FONT({ weight: 500, size: 18, height: 24 }),
  caption: FONT({ weight: 500, size: 16, height: 20 }),
  caption1: FONT({ weight: 500, size: 20, height: 28 }),
  caption2: FONT({ weight: 500, size: 20, height: 24 }),
  caption3: FONT({ weight: 500, size: 14, height: 16 }),
  caption4: FONT({ weight: 500, size: 12, height: 14 }),
  dateText: FONT({ weight: 700, size: 12, height: 14 }),
};

interface SizeProps {
  width: 'default' | 'medium' | 'large';
  height: 'small' | 'medium' | 'large' | 'extraLarge';
}

const modalWidth = {
  default: 350,
  medium: 460,
  large: 485,
};

const modalHeight = {
  small: 300,
  medium: 328,
  large: 347,
  extraLarge: 515,
};

const SIZE = ({ width, height }: SizeProps) => {
  return css`
    width: ${modalWidth[width]}px;
    height: ${modalHeight[height]}px;
  `;
};

const sizes = {
  small: SIZE({ width: 'default', height: 'small' }),
  basic: SIZE({ width: 'default', height: 'medium' }),
};

const theme: DefaultTheme = {
  colors,
  fonts,
  sizes,
};

export default theme;
