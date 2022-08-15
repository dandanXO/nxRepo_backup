import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./config/theme";

interface IAppThemeProvider {
    children: JSX.Element | JSX.Element[];
}

export const AppThemeProvider = (props: IAppThemeProvider) => {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    )
}
