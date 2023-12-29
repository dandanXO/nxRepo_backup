
import cx from "classnames";
import {environment} from "../../../../environments/environment";

type ICloseICON = {
  outLined?: boolean;
  className?: string;
  iconWidth?: number;
  btnClassName?: string;
}
export const CloseICON = (props: ICloseICON) => {
  return (
    // <CloseCircleOutlined className={"text-white text-xl"}/>
    <button className={cx(`${props.btnClassName ? '':'p-2 hover:rounded-full hover:bg-[rgba(255,255,255,0.7)]'}`, props.btnClassName)}>
      <img className={cx(`${props.className? '':'w-[24px] h-[24px]'}`,props.className)}  src={`assets/${environment.assetPrefix}/icon=close${props.outLined ? '-outlined': ''}.png`} alt="Close Icon" />
    </button>
  )
}
