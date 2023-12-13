import styled from "styled-components";
import {environment} from "../../../../../../../environments/environment";
import {Container as BaseContainer} from "../pernambucana/Container"
export const Container = styled(BaseContainer)`
  border: 3px solid var( --stroke-popup);
  border-radius: 20px;
  overflow: hidden;
  background-repeat: no-repeat;
`;
