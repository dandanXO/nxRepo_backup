import styled from "styled-components";

import {ConfirmButton as PConfirmButton} from "../pernambucana/ConfirmButton";

export const ConfirmButton = styled(PConfirmButton)`
  box-shadow: none;
  border-radius: 5px;
  background: ${(props) => !props.disable ? "linear-gradient(60deg, #d88c19, #ffae1a)" : "#FF6000"};
  color: ${(props) => !props.disable ? "#FFFFFF" : "rgba(255,255,255,0.3)"};
  font-weight: 500;
  text-shadow: 0 1px 2px #ad6b07;
  font-family: Heebo;

`
