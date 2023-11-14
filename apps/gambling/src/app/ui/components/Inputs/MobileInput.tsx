import styled from "styled-components";
import {Input} from "./Input";
import {environment} from "../../../../environments/environment";


export const PernambucanaMobileInput = styled(Input)`
  //height: 0.85rem;
  //display: flex;
  //align-items: center;
  //padding: 0 0.24rem;
  //border-radius: 10px;
  //margin-bottom: 0.4rem;
  overflow: visible;
  border: 1px solid var(--input-mobile-border);
  //box-shadow: inset 0 0 0.3rem 0.05rem #000;
  background: var(--assistant);
  //background: linear-gradient(180deg,#1f2332 0%,#090B0F 100%);
  //box-shadow: 0 1px rgba(255,255,255,.5) inset, 0 -0.03rem 0.08rem rgba(0,0,0,.5);
`;

const CocoMobileInput = styled(PernambucanaMobileInput)`
  background: #341972;
  border: 1px solid rgba(90,58,247,.7);
  border-radius: 10px;
`;

export const MobileInput = environment.assetPrefix === "coco777bet" ? CocoMobileInput : PernambucanaMobileInput;
