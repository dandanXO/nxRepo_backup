
import cx from "classnames";
import {environment} from "../../../../environments/environment";

type IICON = {
  className?: string;
}
export const ArrowLeft = (props: IICON) => {
  return (
    <img className={cx("w-[24px] h-[24px]",props.className)}  src={`assets/${environment.assetPrefix}/icon=arrow-left.png`} alt="Close Icon" />
  )
}
