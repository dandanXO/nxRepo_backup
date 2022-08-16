import styled from "styled-components";

const Title = styled.div`
    margin: 25px 0;
    font-size: 20px;
    text-align: center;
    //text-shadow: 1px 0 4px #191a1b;
    color: ${(props) => props.theme.custom.text.primary};
    font-weight: 600;
`;
Title.displayName = "Title";
export default Title;
