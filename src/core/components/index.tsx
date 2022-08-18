import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "./config/theme";

interface IAppThemeProvider {
    theme?: any;
    children: JSX.Element | JSX.Element[];
}
const GlobalStyle = createGlobalStyle`  
  font-family: "Rubik";
`
export const AppThemeProvider = (props: IAppThemeProvider) => {
    return (
        <ThemeProvider theme={props.theme ? props.theme : theme}>
            <GlobalStyle/>
            {props.children}
        </ThemeProvider>
    )
}
