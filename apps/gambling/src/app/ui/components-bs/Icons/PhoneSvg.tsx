import {ISVGComponent} from "../../ISVGComponent";
import {environment} from "../../../../environments/environment";
import cx from "classnames";

export const PhoneSvg = (props: ISVGComponent) => {
  return (
      <img className={cx("w-[24px] h-[24px]",props.className)} src={`assets/${environment.uVersion}/icon=smartphone.png`} alt="Phone Icon" />
  )
}
