import styled from "styled-components";

export const ImageTab = styled.div<{
  active: boolean;
  color?: string;
}>`
  //width: 100px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;

  border-radius: 16px 4px 16px 4px;
  margin-right: 8px;

  ${props => {
    if (!props.active) {
      return `
            background: var(--primary-variant);
            color: var(--white);
          `;
    } else {
      return `
            background-image: linear-gradient(var(--button-gametab-focus-from), var(--button-gametab-focus-via) 15.65%, var(--button-gametab-focus-to));
            color: var(--white);
          `
    }
  }};
`

