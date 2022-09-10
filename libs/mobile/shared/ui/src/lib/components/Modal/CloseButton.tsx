import React from 'react';
import styled from 'styled-components';

const CloseICON = require('../Icon/SVG/ic_close_icon.svg');

interface CloseSVGIconProps {
  fill?: string;
  className?: string;
}
const CloseSVGIcon = (props: CloseSVGIconProps) => {
  const { fill = '#A8A8A8' } = props;
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
    >
      <path
        d="M75.595,74l-4.08-4.08,4.08-4.08A1.124,1.124,0,0,0,74,64.255l-4.08,4.08-4.08-4.08a1.124,1.124,0,0,0-1.59,1.59l4.08,4.08L64.255,74a1.124,1.124,0,0,0,1.59,1.59l4.08-4.08L74,75.595A1.124,1.124,0,0,0,75.595,74Z"
        transform="translate(-63.925 -63.925)"
        fill={fill}
      />
    </svg>
  );
};
//
// interface StyledlessCloseButtonProps {
//     className?: string;
//     onClose?: () => void;
// }
// class StyledlessCloseButton extends React.Component<StyledlessCloseButtonProps> {
//     constructor(props: StyledlessCloseButtonProps) {
//         super(props);
//         this.state = {};
//     }
//     render() {
//         return <div className={this.props.className} onClick={this.props.onClose}></div>;
//     }
// }
// const CloseButton = styled(StyledlessCloseButton)`
//     float: right;
//     /* Margin */
//     margin: 11px 11px 0 0;
//     /* Background */
//     background: url(${CloseICON}) no-repeat;
//     width: 12px;
//     height: 12px;
//     /* Text */
//     text-indent: -9999px;
//     /* Other */
//     cursor: pointer;
//     /* Status             */
//     :hover {
//         /* color: #ff5243; */
//         background-position: -3px -25px;
//     }
//     :active {
//         /* color: #ff1400; */
//         background-position: -3px -46px;
//     }
//     :focus {
//     }
//     :focus-within {
//     }
//     :visited {
//     }
// `;
interface CloseButtonProps {
  onClick?: any;
}
const CloseButton = styled(CloseSVGIcon)<CloseButtonProps>`
  float: right;
  /* Margin */
  margin: 11px 11px 0 0;
  /* Background */
  //background: url(${CloseICON}) no-repeat;
  width: 12px;
  height: 12px;
  /* Text */
  text-indent: -9999px;
  /* Other */
  cursor: pointer;
  /* Status             */
  :hover {
    /* color: #ff5243; */
    background-position: -3px -25px;
  }
  :active {
    /* color: #ff1400; */
    background-position: -3px -46px;
  }
  :focus {
  }
  :focus-within {
  }
  :visited {
  }
`;
export default CloseButton;
