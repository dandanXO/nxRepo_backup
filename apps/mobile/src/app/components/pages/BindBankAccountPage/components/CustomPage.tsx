import styled from "styled-components";
import {IThemeConfig, Page} from "@frontend/mobile/shared/ui";

export const CustomPage = styled(Page)<{theme: IThemeConfig}>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // NOTICE: 底色
    background: ${(props) => props.theme.page.bgColor};
    //height: 100vh;
`;
