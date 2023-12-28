import styled from "styled-components";

interface IToolButton {
  isMobile?: boolean
}
export const ToolButton = styled.button<IToolButton>`
  ${({ isMobile }) => isMobile && `
    border-radius: 100px;
    padding: 8px;
    box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.25) inset, 0px 4px 4px 0px rgba(255, 255, 255, 0.25) inset;
  `}
`;
