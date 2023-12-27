import styled from "styled-components";
import {environment} from "../../../../environments/environment";
import {renderByPlatform} from "../../utils/renderByPlatform";
import { DTelegramContactModal } from "./default"
import { RiojungleTelegramContactModal } from './env/riojungle'


const Container = styled.div`
  //width: 100%;
  //height: 100%;
  background-image: url(assets/${environment.assetPrefix}/ad_bg_2.png);
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 20px;
`;

const ModalTitle = styled.div`
  text-align: center;
  line-height: 26px;
  //text-shadow: 0px 3px 0px #0461D6;
`

const ModalButton = styled.button`
  border-radius: 25px;
  background: linear-gradient(180deg,var(--secondary-main-from) 0%,var(--secondary-main-to) 100%);
  //position: absolute;
  //bottom: 34px;
  //left: 50%;
  //margin-left: -100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
`

export type ITelegramContactModal = {
  close: () => void;
  toTelegramGroup: () => void;
}

export const TelegramContactModal = (props: ITelegramContactModal) => {

  return renderByPlatform({
    "riojungle777bet": <RiojungleTelegramContactModal {...props}/>,
  }, <DTelegramContactModal {...props}/>);
}

