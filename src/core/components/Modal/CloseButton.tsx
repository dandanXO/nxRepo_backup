import React from "react";
import styled from "styled-components";
const CloseICON = require("../images/modal/close.png");

interface StyledlessCloseButtonProps {
    className?: string;
    onClose?: () => void;
}
class StyledlessCloseButton extends React.Component<StyledlessCloseButtonProps> {
    constructor(props: StyledlessCloseButtonProps) {
        super(props);
        this.state = {};
    }
    render() {
        return <div className={this.props.className} onClick={this.props.onClose}></div>;
    }
}
const CloseButton = styled(StyledlessCloseButton)`
    float: right;
    /* Margin */
    margin: 11px 11px 0 0;
    /* Background */
    background: url(${CloseICON}) no-repeat -3px -4px;
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
CloseButton.displayName = "CloseButton";

export default CloseButton;
