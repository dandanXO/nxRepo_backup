import styled from "styled-components"
import {environment} from "../../../../../environments/environment";

export const ChargeButton = styled.button`
  cursor: pointer;
  // background: url("assets/${environment.assetPrefix}/btn_agora.png") center center no-repeat;
  background: linear-gradient(45deg,var(--btn-gradient1-from) 0%,var(--btn-gradient1-to) 100%);
  background-size: cover; /* 背景圖片尺寸適應容器 */
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  width: 300px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 60px auto 40px; */
  color: #247855;
`

