
import {CloseCircleOutlined} from "@ant-design/icons";
import cx from "classnames";
import {environment} from "../../../../environments/environment";

type ICloseICON = {
  className?: string;
}
export const CloseICON = (props: ICloseICON) => {
  return (
    // <CloseCircleOutlined className={"text-white text-xl"}/>
    <img className={cx("w-[24px] h-[24px]",props.className)}  src={`assets/${environment.assetPrefix}/icon=close.png`} alt="Close Icon" />
  )
}
