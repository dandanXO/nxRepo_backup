import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./config/theme";

interface IAppThemeProvider {
    children: React.ReactElement;
}

export const AppThemeProvider = (props: IAppThemeProvider) => {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    )
}
