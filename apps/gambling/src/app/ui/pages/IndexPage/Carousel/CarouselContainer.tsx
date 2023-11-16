import cx from "classnames";

type IProps = {
  className?: string;
  children: React.ReactNode;
}
export const CarouselContainer = (props: IProps) => {
  return (
    <div className={cx("pointer-events-none", props.className)}>{props.children}</div>
  )
}
