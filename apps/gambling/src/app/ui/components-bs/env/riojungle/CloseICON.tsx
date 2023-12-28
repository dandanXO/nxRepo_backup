import closeSVG from "../../../drawers/MenuDrawer/env/riojungle/icon-close.svg";
import cx from "classnames";
import {CloseSVG} from "./CloseSVG";

type ICloseICON = {
  onClick?: (event: unknown) => void;
  className?: string;
}
export const CloseICON = (props:ICloseICON) => {
  return (
    <CloseSVG/>
  )
  return (
    <img
      alt={"close"}
      className={cx("cursor-pointer", props.className)} src={closeSVG}
    />
  )
}
