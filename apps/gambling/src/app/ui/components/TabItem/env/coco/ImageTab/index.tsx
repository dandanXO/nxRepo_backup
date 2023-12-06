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

  // NOTICE: 左上右下斜邊
  //border-radius: 16px 4px 16px 4px;
  border-radius: 8px;

  //padding: 0 10px;
  flex-basis: auto;

  ${props => {
    if (!props.active) {
      return `
            background: var(--primary-variant);
            color: var(--primary-assistant);
            border: 1px solid var(--primary-assistant);
          `;
    } else {
      return `
            background: linear-gradient(180deg, var(--primary-main-from) 0%, var(--primary-main-to) 100%);
            color: var(--white);
          `
    }
  }};
`

