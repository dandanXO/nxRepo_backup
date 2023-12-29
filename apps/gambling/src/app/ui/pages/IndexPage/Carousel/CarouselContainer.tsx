import cx from "classnames";
import {useRef} from "react";

type IProps = {
  className?: string;
  children: React.ReactNode;
  onClickBanner?: (event: any) => void;
  isMoving: boolean;
}
export const CarouselContainer = (props: IProps) => {
  return (
    <div
      style={{
        touchAction: "none",
      }}
      onClick={(event) => {
        if(props.isMoving) {
          event.preventDefault();
        } else {
          props.onClickBanner && props.onClickBanner(event);
        }
      }}
    >
      <button className={cx("", props.className)}>
        {props.children}
      </button>
    </div>
  )
}
