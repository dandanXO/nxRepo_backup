import React from "react";
import styled from "styled-components";

interface ScrollContainerProps {
    width: string;
    height: string;
}
const ScrollContainer = styled.div.attrs({
    className: "scrollContainer",
})<ScrollContainerProps>`
    position: relative;
    width: ${props => props.width};
    height: ${props => props.height};
    /* Remove native browser scrollbar style */
    .infinite-scroll::-webkit-scrollbar {
        display: none;
    }
    .infinite-scroll {
        -ms-overflow-style: none;
    }
`;
export default ScrollContainer;
