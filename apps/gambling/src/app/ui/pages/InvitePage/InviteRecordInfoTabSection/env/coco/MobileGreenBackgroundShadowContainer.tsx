import styled from "styled-components";
import { environment } from "../../../../../../../environments/environment";

const containerStyle = environment.assetPrefix === 'coco777bet' ?
`
border-radius: 16px;
background: var(--background-dashboard-main);
box-shadow: 4px 4px 4px 0px rgba(255, 255, 255, 0.25) inset, -4px -4px 4px 0px rgba(255, 255, 255, 0.25) inset;
` : 
`
border: 2px solid transparent;
background-clip: padding-box,border-box;
background-origin: padding-box,border-box;
background-image: linear-gradient(0deg,#2E104C,#3F28AF),linear-gradient(180deg,#5A3AF7,#500E8D);
`


export const MobileGreenBackgroundShadowContainer = styled.div`
  ${containerStyle}
`
