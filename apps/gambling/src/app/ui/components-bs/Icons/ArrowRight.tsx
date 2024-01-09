
import cx from "classnames";
import {environment} from "../../../../environments/environment";

type IICON = {
  className?: string;
}
export const ArrowRight = (props: IICON) => {
  return (
    <img className={cx("w-[24px] h-[24px]",props.className)} src={`assets/${environment.uVersion}/icon=arrow-right.png`} alt="Close Icon" />
  )
}
