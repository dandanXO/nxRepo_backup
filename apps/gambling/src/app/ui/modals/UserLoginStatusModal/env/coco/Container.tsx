import styled from "styled-components";
import {Container as PContainer} from "../pernambucana/Container";

export const Container = styled(PContainer)`
  border: 2px solid var(--stroke-modal);
  //background-clip: padding-box,border-box;
  //background-origin: padding-box,border-box;
  background-image: linear-gradient(180deg,var(--background-modal-from),var(--background-modal-to));
`
