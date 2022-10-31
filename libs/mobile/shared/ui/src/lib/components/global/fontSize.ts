const basicFontSize = 16;
const fontSizeList = [12, 14, 16, 18, 20, 24, 26, 28, 30, 32, 36, 38];

export const fontSizeListToRem = fontSizeList.reduce((prev, curr) => {
  return {...prev, ...{[curr]: curr / basicFontSize + 'rem'}};
}, {});
