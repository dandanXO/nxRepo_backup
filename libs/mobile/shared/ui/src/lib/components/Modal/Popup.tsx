import styled from 'styled-components';

interface PopupProps {
  width?: number;
  height?: number;
}
const Popup = styled('div')<PopupProps>`
  /* Display */
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  /* Center */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* Margin */
  margin: 0 auto;
  /* Border */
  border-radius: 5px;
  /* Background */
  /* background: rgba(45, 59, 88, 0.85); */
  background: ${(props) => props.theme.custom.background.primary};
  /* Padding */
  /* Content */
  max-height: 90vh;
  overflow: scroll;
  /* NOTICE: */
  min-width: 320px;
  //min-height: 300px;
  // height: ${(props) => props.height + 'px' || 'auto'};
  /* Text */
  color: #fff;
  font-size: 14px;
  line-height: 18px;
  /* Other */
  box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.36);
  zoom: 1;
  /* NOTICE */
  /* Z-index     */
  z-index: 1003;
  /* NOTICE */
  :nth-child(n) {
    filter: none;
  }
`;
Popup.displayName = 'Popup';
export default Popup;
