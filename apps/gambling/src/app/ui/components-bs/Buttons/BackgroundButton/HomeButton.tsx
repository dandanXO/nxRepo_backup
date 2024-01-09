import styled from "styled-components";
import {BackgroundButton} from "../BackgroundButton";
import {environment} from "../../../../../environments/environment";

export const HomeButton  = styled(BackgroundButton)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: url(assets/${environment.uVersion}/btn_home.png) no-repeat center/100%;
  height: 40px;
`
