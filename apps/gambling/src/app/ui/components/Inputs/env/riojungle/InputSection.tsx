import styled from "styled-components";
import { tcx } from "../../../../utils/tcx";

export const InputSection = styled.a.attrs((props) => ({
  className: tcx("p-2.5 md:py-2 md:px-2.5 lg:p-2.5 border-solid border border-[#808080] rounded-lg bg-[#333]", props.className),
})) <{
  focus?: boolean;
  validation?: boolean;
  className?: string;
}>`
  display: flex;
  flex-direction: row;
  transition: all .4s;

  ${(props) => props.focus && `
    border: 2px solid #8547EB;;
  `}
  ${(props) => props.validation === false && `
    border-color: var(--input-invalidation-border);
  `}

`
