import styled from "styled-components";

export const InputLintContent = styled.div`
    box-sizing: border-box;
    border: 1px solid #ff5243;
    background-color: ${props => (props.theme.mode == "early" ? "rgba(254, 218, 215, 0.9)" : "#3f374f")};
    color: #ff5243;
    padding: 4px;
    font-size: 12px;
    border-radius: 3px;
`;
