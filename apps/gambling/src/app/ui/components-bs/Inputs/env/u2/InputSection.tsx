import styled from "styled-components";
import { tcx } from "../../../../utils/tcx";

export const InputSection = styled.a.attrs((props) => ({
  className: tcx("p-2.5 md:py-2 md:px-2.5 lg:p-2.5 border-solid border border-[var(--input-border)] rounded-lg bg-[var(--input-background)]", props.className),
})) <{
  focus?: boolean;
  validation?: boolean;
  className?: string;
}>`
  display: flex;
  flex-direction: row;
  transition: all .4s;

  ${(props) => props.focus && props.validation !== false &&`
    border: 2px solid var(--input-focus-border);
  `}
  ${(props) => props.validation === false && `
    border-color: var(--input-invalidation-border);
  `}

`
