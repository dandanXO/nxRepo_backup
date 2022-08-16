import styled from "styled-components";
// FIXME:
// Cannot find module './images/grid_bg.png'.
// So replace to below:
// import OverlayImage from "./images/grid_bg.png";
// const OverlayImage = require("../../../images/modal/grid_bg.png");
const OverlayImage = require("../images/modal/grid_bg.png");

interface OverlayProps {
    mask: boolean;
}
const Overlay = styled("div")<OverlayProps>`
    /* Display */
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;    
    /* Background */
    // ${props => props.mask && `background: url(${OverlayImage}) repeat`};
    background: rgba(0, 0, 0, 0.6);
    /* background: url(${OverlayImage}) repeat */
    /* Other */
    z-index: 1040;

`;
Overlay.displayName = "Overlay";
export default Overlay;
