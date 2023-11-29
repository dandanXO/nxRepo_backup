import cx from "classnames";

type IProps = {
  className?: string;
  children: React.ReactNode;
  onClickBanner?: (event: any) => void;
  isMoving: boolean;
}
export const CarouselContainer = (props: IProps) => {
  return (
    <div
      onClick={(event) => {
        if(props.isMoving) {
          event.preventDefault();
        } else {
          props.onClickBanner && props.onClickBanner(event);
        }
      }}
    >
      {/*解決圖片會被拖曳*/}
      <button className={cx("pointer-events-none", props.className)}>
        {props.children}
      </button>
    </div>
  )
}
