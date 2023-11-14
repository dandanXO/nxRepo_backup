import styled from "styled-components";

export const CommonTableTabG = styled.div<{
  active: boolean;
}>`
  ${(props) => props.active && `
    color: ${props.active ? '#ffffff' : '#ffffff'}; /* 设置文本颜色 */

    &:after {
      display: block;
      content: "";
      width: 50px;
      height: 3px;
      bottom: 0;
      background: ${props.active ? 'rgba(255, 255, 255, 0.7)' : 'transparent'};
      transform: translateX(50%) translateX(-50%);
      transition-duration: 0.3s;
      box-shadow: ${props.active ? '0 0 10px rgba(255, 255, 255, 1)' : 'none'};
    }
  `};
`
