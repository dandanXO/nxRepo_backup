const basicFontSize = 16;
const fontSizeList = [12, 14, 16, 18, 20, 24, 26, 28, 30, 32, 36, 38];
const fontSizeListToRem = fontSizeList.reduce((prev, curr) => {
    return { ...prev, ...{ [curr]: curr / basicFontSize + "rem" } };
}, {});

const ThemeColors = {
    black: "#101010",
    lightBlack: "#000000D9",
    white: "#FFFFFF",
    red: "#FF0000",
    red100: "#F82626",
    orange: "#F58B10",
    mediumOrange: "#FCC76E",
    lightOrange: "#FFF0DE",
    yellow: "#FFD800",
    lightYellow: "#FFD8004D",
    blue: "#0091de",
    gray100: "#F9FAFC",
    gray200: "#E5E5E5",
    gray300: "#00000021",
    gray400: "#00000029",
    gray500: "#AAAAAA",
};

const theme = {
    color: ThemeColors,
    boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.13)",
    fontSize: fontSizeListToRem,
    // NOTE:
    background: ThemeColors.gray100,
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
    info: ThemeColors.gray500,
    // NOTICE: Custom
    custom: {
        background: {
            primary: "#fff",
        },
        text: {
            primary: "rgb(0,0,0,0.85)",
            secondary: "#aaaaaa",
        },
        fontfamily: "Rubik",
        font: {},
        // NOTE: Radio
        radio: {
            primary: "#f58b10",
            secondary: "#aaaaaa",
        },
        // NOTE:
        button: {
            primary: {
                background: "#f58b10",
                text: "f58b10",
            },
            secondary: {
                background: "",
                text: "",
            },
            alert: {
                background: "#f58b10",
                text: "f58b10",
            },
        },
        horizontal: {
            color: "#e5e5e5",
        },
    },
};
export default theme;

const defaultTheme = {
    background: {
        primary: "rgba(45, 59, 88, 0.85)",
    },
};
