import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "./config/theme";

interface IAppThemeProvider {
    theme?: any;
    children: JSX.Element | JSX.Element[];
}
const GlobalStyle = createGlobalStyle`  
  body {
    font-family: Rubik;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: #f9fafc;
  }
`;
export const AppThemeProvider = (props: IAppThemeProvider) => {
    return (
        <ThemeProvider theme={props.theme ? props.theme : theme}>
            <GlobalStyle />
            {props.children}
        </ThemeProvider>
    );
};
