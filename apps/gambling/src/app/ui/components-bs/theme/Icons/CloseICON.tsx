
import {CloseCircleOutlined} from "@ant-design/icons";
import cx from "classnames";
import {environment} from "../../../../../environments/environment";

type ICloseICON = {
  outLined?: boolean;
  className?: string;
}
export const CloseICON = (props: ICloseICON) => {
  return (
    // <CloseCircleOutlined className={"text-white text-xl"}/>
    <button className={cx('p-2 hover:rounded-full hover:bg-[rgba(255,255,255,0.7)]')}>
      <img className={cx("w-[24px] h-[24px]",props.className)}  src={`assets/${environment.assetPrefix}/icon=close${props.outLined ? '-outlined': ''}.png`} alt="Close Icon" />
    </button>
  )
}
