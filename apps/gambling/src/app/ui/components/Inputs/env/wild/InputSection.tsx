import styled from "styled-components";
import cx from "classnames";

export const InputSection = styled.a.attrs((props) => ({
  className: cx("py-4 px-3.5 border-solid border rounded-3xl", props.className),
}))<{
  focus?: boolean;
  validation?: boolean;
}>`
  //border: 1px solid transparent;
  /* border: 1px solid var(--main-primary-main); */
  /* border-radius: 25px; */

  //box-shadow: inset 0 0 36px 5px rgba(255,255,255,.08);

  /* padding: 14px 16px; */
  display: flex;
  flex-direction: row;

  transition: all .4s;

  border-color: var(--input-border);

  ${(props) => props.focus && `
    border-color: var(--input-focus-border);
  `}
  ${(props) => props.validation === false && `
    border-color: var(--input-invalidation-border);
  `}

  background: var(--input-background);
`
