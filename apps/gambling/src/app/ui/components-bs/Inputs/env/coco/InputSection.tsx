import styled from "styled-components";
import { tcx } from "../../../../utils/tcx";

export const InputSection = styled.a.attrs((props) => ({
  className: tcx("py-3 px-4 border-solid border rounded-lg bg-[var(--input-background)]", props.className),
}))<{
  focus?: boolean;
  validation?: boolean;
  className?: string;
}>`
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

`
