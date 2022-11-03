import styled from "styled-components";
import {IThemeConfig} from "@frontend/mobile/shared/ui";

const Container = styled.div<{ theme: IThemeConfig}>`
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  background: #fff;
`;

export default Container;
