import React from 'react';
import {ThemeProvider} from 'styled-components';
import defaultThemeConfig from './global/DefaultThemeConfig';
import {GlobalStyle} from "./global/globalStyle";

interface IAppThemeProvider {
  theme?: any;
  children: JSX.Element | JSX.Element[];
}
export const AppThemeProvider = (props: IAppThemeProvider) => {
  return (
    <ThemeProvider theme={props.theme ? props.theme : defaultThemeConfig}>
      <GlobalStyle />
      {props.children}
    </ThemeProvider>
  );
};
