import {Dimensions, PixelRatio, Platform, StyleSheet} from 'react-native';
// import CryptoJS from 'crypto-js';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// figma screen design  height & width
const widthBaseScale = SCREEN_WIDTH / 375;
const heightBaseScale = SCREEN_HEIGHT / 812;

function styleSheetCompose(style1, style2) {
  return StyleSheet.compose(style1, style2);
}

function styleSheetFlatten(styles) {
  return StyleSheet.flatten(styles);
}

function normalize(size, based = 'width') {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

// for width  pixel
function widthPixel(size) {
  return normalize(size, 'width');
}
// for height  pixel
function heightPixel(size) {
  return normalize(size, 'height');
}
// for font  pixel
function fontPixel(size) {
  return heightPixel(size);
}
// for Margin and Padding vertical pixel
function pixelSizeVertical(size) {
  return heightPixel(size);
}
// for Margin and Padding horizontal pixel
function pixelSizeHorizontal(size) {
  return widthPixel(size);
}

function isIos() {
  return Platform.OS === 'ios';
}

function isAndroid() {
  return Platform.OS === 'android';
}

// export const decrypt = encryptedText => {
//   const key = CryptoJS.enc.Utf8.parse('%890MNOPQR456ghijkl4567STUVWXYZm');
//   const iv = CryptoJS.enc.Utf8.parse('!@ABCDEFabcdef12');

//   const decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
//     iv: iv,
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.Pkcs7,
//   });

//   console.log('------------', CryptoJS.enc.Utf8);
//   console.log('>>>>>>>>>>>>', decrypted.toString(CryptoJS.enc.Utf8));

//   return decrypted.toString(CryptoJS.enc.Utf8);
// };

const FONT_FAMILY = {
  Bold: 'InstrumentSans-Bold',
  SemiBold: 'InstrumentSans-SemiBold',
  Medium: 'InstrumentSans-Medium',
  Regular: 'InstrumentSans-Regular',
};

export {
  FONT_FAMILY,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  fontPixel,
  heightPixel,
  isAndroid,
  isIos,
  pixelSizeHorizontal,
  pixelSizeVertical,
  styleSheetCompose,
  styleSheetFlatten,
  widthPixel,
};
