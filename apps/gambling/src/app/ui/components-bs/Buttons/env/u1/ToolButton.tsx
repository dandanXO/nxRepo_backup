import styled from "styled-components";

interface IToolButton {
  isMobile?: boolean
}
export const ToolButton = styled.button<IToolButton>`
  ${({ isMobile }) => isMobile && `
    border-radius: 12px;
    border: 1px solid var(--primary-assistant);
    background-clip: padding-box,border-box;
    background-origin: padding-box,border-box;
    background-image: linear-gradient(0deg, var(--lineary-blue-from), var(--lineary-blue-to));
    padding: 4px;
    width: 38px;
    height: 38px;
  `}
`;