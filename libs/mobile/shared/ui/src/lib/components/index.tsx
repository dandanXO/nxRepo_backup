import React from 'react';
import {ThemeProvider} from 'styled-components';
import {GlobalStyle} from "./global/globalStyle";

interface IAppThemeProvider {
  theme: any;
  children: JSX.Element | JSX.Element[];
}
export const AppThemeProvider = (props: IAppThemeProvider) => {
  return (
    <ThemeProvider theme={props.theme}>
      <GlobalStyle />
      {props.children}
    </ThemeProvider>
  );
};
