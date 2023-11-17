import styled from "styled-components";
import {environment} from "../../../../environments/environment";

export const PernambucanaConfirmButton = styled.div<{
  disable?: boolean;
}>`
  margin-right: 118px;

  box-shadow: 0 2px #036a02, inset 0 1px 3px rgba(255,255,255,.5);
  border-radius: 25px;
  background: linear-gradient(180deg,var(--btn-gradient1-from) 0%,var(--btn-gradient1-to) 100%);
  width: 140px;
  height: 40px;
  font-size: 18px;
  color: #247855;

  justify-self: flex-end;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  //text-shadow: 0 1px 3px #036A02;
  transition: all .1s ease-in-out;

`
const CocoConfirmButton = styled(PernambucanaConfirmButton)`
  box-shadow: none;
  border-radius: 5px;
  background: ${(props) => !props.disable ? "linear-gradient(60deg, #d88c19, #ffae1a)" : "#FF6000"};
  color: ${(props) => !props.disable ? "#FFFFFF" : "rgba(255,255,255,0.3)"};
  font-weight: 500;
  text-shadow: 0 1px 2px #ad6b07;
  font-family: Heebo;

`

export const ConfirmButton = environment.assetPrefix === "coco777bet" ? CocoConfirmButton : PernambucanaConfirmButton;
