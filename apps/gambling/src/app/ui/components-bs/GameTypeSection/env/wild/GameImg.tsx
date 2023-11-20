import styled from "styled-components";
import cx from "classnames";

export const GameImg = styled.img.attrs((props) => ({
  className: cx(
    "border-transparent border-r-[2px] border-[1px] border-solid",
    "max-w-full w-full h-full rounded-xl hover:blur-[2px]",
    "bg-[#FFFA05]",
    props.className)
}))<{
  className?: string;
}>`

`
