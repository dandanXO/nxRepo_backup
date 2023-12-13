import styled from "styled-components";
import cx from "classnames";

export const LogoutPopoverContainer = styled.div.attrs((props) => ({
  className: cx(
    "flex flex-col flex-between text-sm rounded-xl ",
    "px-8 md:px-6 py-4 md:py-3 w-[calc(100%-48px)] md:w-[272px]",
    "fixed top-[37.5%] md:right-[10px] md:top-[100px] z-30  ",
    "bg-gradient-to-b from-[var(--background-modal-from)] to-[var(--background-modal-to)]",
    "border border-solid border-[var(--stroke-modal)]",
    "shadow-[-2px_-2px_2px_0px_rgba(255,255,255,0.25)_inset,2px_2px_2px_0px_rgba(255,255,255,0.25)_inset]",
    "text-white", props.className),
}))<{
  className?: string;
}>`
`
