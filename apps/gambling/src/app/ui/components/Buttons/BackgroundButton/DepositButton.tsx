import styled from "styled-components";
import {BackgroundButton} from "../BackgroundButton";
import {environment} from "../../../../../environments/environment";

export const DepositButton = styled(BackgroundButton)`
    //background: url(assets/${environment.assetPrefix}/btn_FirstDeposit.png) no-repeat center/100%;
  background: linear-gradient(180deg, #FE6060 0%, #FFA24D 100%);
  border-radius: 10px;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  &.active-drawer-button {
    background: url(/assets/${environment.assetPrefix}/menuBg1.png) no-repeat center/100%;
    height: 50px;
  }
`
