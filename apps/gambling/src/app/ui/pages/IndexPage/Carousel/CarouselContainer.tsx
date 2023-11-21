import cx from "classnames";
import {useState} from "react";

type IProps = {
  className?: string;
  children: React.ReactNode;
  onClickBanner?: () => void;
}
export const CarouselContainer = (props: IProps) => {
  const [canClick, setCanClick] = useState<boolean>(true);
  return (
    // <div className={cx("pointer-events-none", props.className)}>{props.children}</div>
    <button className={cx("", props.className)}
        // onDragStart={() => {
        //   setCanClick(false)
        // }}
        //  onDragEnd={() => {
        //    setCanClick(true)
        //  }}
         onClick={() => {
           canClick && props.onClickBanner && props.onClickBanner();
        }}
    >
      {props.children}
    </button>
  )
}
