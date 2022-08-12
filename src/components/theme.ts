
const basicFontSize = 16;
const fontSizeList = [12, 14, 16, 18, 20, 24, 28, 30, 32, 36, 38];
const fontSizeListToRem = fontSizeList.reduce((prev, curr) => {
    return { ...prev, ...{ [curr]: curr / basicFontSize + "rem" } };
}, {});

const ThemeColors = {
    black: "#101010",
    lightBlack: "#000000D9",
    white: "#FFFFFF",
    red: "#FF0000",
    orange: "#F58B10",
    mediumOrange: "#FCC76E",
    lightOrange: "#FFF0DE",
    yellow: "#FFD800",
    lightYellow: "#FFD8004D",
    gray100: "#F9FAFC",
    gray200: "#E5E5E5",
    gray300: "#00000021",
    gray400: "#00000029",
    gray500: "#AAAAAA",
}

export default {
    color: ThemeColors,
    primary: {
        main: ThemeColors.orange,
        text: ThemeColors.white,
    },
    secondary: {
        main: ThemeColors.lightOrange,
        text: ThemeColors.orange,
    },
    link: {
        main: "none",
        text: ThemeColors.gray500,
    },
    error: ThemeColors.red,
    background: ThemeColors.gray100,
    info: ThemeColors.gray500,
    boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.13)",
    fontSize: fontSizeListToRem,
};