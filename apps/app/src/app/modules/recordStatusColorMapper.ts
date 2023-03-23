import { DefaultThemeConfig } from "@frontend/mobile/shared/ui";

const { color } = DefaultThemeConfig;

const recordStatusStyleProps: {
    [key: string]: object;
} = {
    extend: {
        color: color.blue,
    },
    "pay off": {
        color: color.gray500,
        fontWeight: "bold",
    },
    partial: {
        color: color.gray500,
    },
    "overdue / pay off": {
        color: color.red100,
        fontWeight: "bold",
    },
    "overdue / partial": {
        color: color.red100,
    },
    "reduction repayment": {
        color: color.blue,
        fontWeight: "bold",
    },
};

export default recordStatusStyleProps;