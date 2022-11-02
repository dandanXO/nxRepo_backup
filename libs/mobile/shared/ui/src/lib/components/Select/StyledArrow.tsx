import styled from "styled-components";

const StyledArrow = styled.div<{theme: string}>`
    // color: ${props => (props.theme == "early" ? "#52c8f9" : "")};
    display: inline-block;
    padding: 0 0 0 0;
    position: absolute;
    right: 7px;
    top: 0;
`;
export default StyledArrow;
