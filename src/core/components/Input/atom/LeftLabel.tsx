import styled from "styled-components";

interface Label {
    for?: string;
}
export const LeftLabel = styled.label<Label>`
    font-weight: 300;
    color: #aaaaaa;
`;
