import styled from "styled-components";
import cx from "classnames";

export const LogoutPopoverContainer = styled.div.attrs((props) => ({
  className: cx("fixed right-[10px] top-[100px] z-30 w-[240px] bg-assistant rounded-xl p-[10px] flex flex-col flex-between text-sm",
    "text-white",props.className),
}))<{
  className?: string;
}>`
`
