import {EyeInvisibleOutlined, EyeOutlined} from "@ant-design/icons";
import {environment} from "../../../../../environments/environment";
import cx from "classnames";

type IHidableEyeSvg = {
  hide: boolean;
  className?: string;
}
export const HidableEyeSvg = (props: IHidableEyeSvg) => {
  return (
    <>
      {
        props.hide ? (
          // <EyeOutlined className={"text-[#8B619E]"}/>
          <img className={cx("w-[23px] h-[20px]",props.className)} src={`assets/${environment.assetPrefix}/icon=eye-close.png`} alt="eye-close" />
        ) : (
          <img className={cx("w-[23px] h-[20px]",props.className)}  src={`assets/${environment.assetPrefix}/icon=eye-show.png`} alt="eye-open" />
        )
      }
    </>
  )
}
