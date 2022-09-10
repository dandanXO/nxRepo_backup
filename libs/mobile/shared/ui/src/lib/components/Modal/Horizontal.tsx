import styled from "styled-components";

interface HorizontalProps {
    width?: string;
}
const Horizontal = styled.div<HorizontalProps>`
    height: 1px;
    background: ${(props) => props.theme.custom.horizontal.color};
    // width: ${(props) => (props.width ? props.width : "94%")};
    margin: 0 auto;
`;
export default Horizontal;
