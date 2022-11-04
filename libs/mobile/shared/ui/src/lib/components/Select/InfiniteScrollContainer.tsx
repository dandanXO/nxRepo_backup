import styled from "styled-components";

interface SelectListContainerProps {
    height: number;
    width?: string;
    mode?: string;
}
const InfiniteScrollContainer = styled.div.attrs({
    className: "scroll-container dropdown-list-body",
})<SelectListContainerProps>`
    // NOTICE: Didn't need to pass value, depend on child element;
    //width: 114px;
    //width: 150px;
    min-width: 70px;
    width: ${props => (props.width ? props.width :  "auto")};
    height: ${props => props.height}px;
    //max-height: 220px;
    //min-height: 220px;
    //height: 100%;
    padding: 8px 0 8px 0;
    //background: #4d5c77;
    //background: pink;
    //background: #2e3e68;
    border-radius: 4px;
    border: 1px solid #aaa;
    //box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.36);
`;

export default InfiniteScrollContainer;
