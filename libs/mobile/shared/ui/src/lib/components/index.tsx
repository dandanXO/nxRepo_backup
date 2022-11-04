import React from 'react';
import {ThemeProvider} from 'styled-components';
import {GlobalStyle} from "./global/globalStyle";
import DefaultThemeConfig from "./global/skin/default/DefaultThemeConfig";
import {GreenThemeConfig, IThemeConfig} from "@frontend/mobile/shared/ui";

interface IAppThemeProvider {
  theme?: IThemeConfig;
  children: JSX.Element | JSX.Element[];
}
export const AppThemeProvider = (props: IAppThemeProvider) => {
  return (
    <ThemeProvider theme={props.theme || GreenThemeConfig}>
      <GlobalStyle />
      {props.children}
    </ThemeProvider>
  );
};
