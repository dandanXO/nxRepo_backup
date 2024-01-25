import styled from "styled-components";
import {ITabItem} from "../../TabItem";
import {environment} from "../../../../../../environments/environment";

export const StyledTabItem = styled.button<ITabItem>`
  //min-width: 96px;
  //min-height: 35px;
  color: var(--white);
  ${(props) => {
  if (props.pureColor === true) {
    if (!props.active) {
      return `
          color: var(--white);
        `;
    } else {
      return `
          color: var(--main-primary-varient);
          border: 1px solid var(--white);
        `
    }
  }
}};
  ${(props) => {
  if (!props.pureColor) {
    return props.active && `
        background: ${props.background ? props.background : `url("assets/${environment.uVersion}/select_btn.png")`};
        background-size: 100% 100%;
        background-position:  center;
      `;
  } else {
    if (props.active) {
      return `
          background: linear-gradient(90deg, var(--btn-gradient1-from), var(--btn-gradient1-to));
          border-radius: 8px;
        `;
    } else {
      return `
          background: var(--assistant);
          border-radius: 8px;
        `
    }

  }
}}
`;
