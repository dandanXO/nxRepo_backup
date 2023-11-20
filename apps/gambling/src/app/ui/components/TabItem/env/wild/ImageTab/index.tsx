import styled from "styled-components";
import activeTabImg from "./tab.png"
import inactiveTabImg from "./tab-inactive.png"

export const ImageTab = styled.div<{
  active: boolean;
  color?: string;
}>`
  width: 100px;
  height: 32px;
  background: ${props => props.active ? `url(${activeTabImg}) no-repeat center/100% 100%` : `url(${inactiveTabImg}) no-repeat center/100% 100%`};
  line-height: 32px;
  text-align: center;
  font-size: 14px;
  color: ${props => props.active ? `#ffffff` : props.color ? props.color : `#669eef`};
  cursor: pointer;



`
// if (!props.active) {
//   return `
//             background: var(--primary-variant);
//             color: var(--white);
//           `;
// } else {
//   return `
//             background-image: linear-gradient(var(--button-gametab-focus-from), var(--button-gametab-focus-via), var(--button-gametab-focus-to));
//             color: var(--white);
//           `
// }
