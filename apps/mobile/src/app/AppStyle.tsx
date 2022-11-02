import {createGlobalStyle} from "styled-components";
import {IThemeConfig} from "@frontend/mobile/shared/ui";

interface IGlobalStyle {
  theme: IThemeConfig
}
export const AppStyle = createGlobalStyle<IGlobalStyle>`
  body {
    font-family: Rubik;
    margin: 0;
    padding: 0;
    // NOTE: APP 底色
    background: ${(props) => props.theme.page.bgColor};
    box-sizing: border-box;
    height: 100%;
  }
`;
