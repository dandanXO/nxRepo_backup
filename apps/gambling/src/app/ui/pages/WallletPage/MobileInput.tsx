import styled from "styled-components";
import {Input} from "../../components/Input";

export const MobileInput = styled(Input)<{
  // focus?: boolean;
  
}>`
  /* border: 1px solid #3CC78C; */
  overflow: hidden;
  background-clip: padding-box,border-box;
  background-origin: padding-box,border-box;
  /* background: #16583C; */
  
  //background-image: linear-gradient(180deg,#133f23,#090B0F),linear-gradient(90deg,#FFF600,#4FFB0C);
  //&:focus {
  //  background-image: linear-gradient(180deg,#133f23,#090B0F),linear-gradient(90deg,#FFF600,#4FFB0C);
  //}
`;
