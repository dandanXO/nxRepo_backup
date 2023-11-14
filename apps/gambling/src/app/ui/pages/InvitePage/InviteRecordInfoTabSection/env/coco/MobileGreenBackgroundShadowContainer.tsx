import styled from "styled-components";
import {environment} from "../../../../../../../environments/environment";

export const MobileGreenBackgroundShadowContainer = styled.div`
  //background: linear-gradient(45deg,#478E51 0%,#5DDC54 100%);
  //box-shadow: inset 0 -0.16rem 0.34rem #72fc6c;
  //background: url("assets/${environment.assetPrefix}/h5_invite_dashboard_2.png") center center no-repeat;
  //background-size: cover;

  border-radius: 10px;
  /* padding: 0.15rem 0; */
  /* position: relative; */
  border: 2px solid transparent;
  background-clip: padding-box,border-box;
  background-origin: padding-box,border-box;
  background-image: linear-gradient(0deg,#2E104C,#3F28AF),linear-gradient(180deg,#5A3AF7,#500E8D);

`
