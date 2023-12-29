import cx from "classnames";
import useBreakpoint from "../../hooks/useBreakpoint";

type IContainer = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  y?: boolean;
  style?: unknown;
  id?: string;
}
export const Container = (props: IContainer) => {
  const isY = typeof props.y === "undefined" ? true : props.y;
  const {isMobile} = useBreakpoint();
  return (
    <div
      id={props.id}
      className={cx({
        "px-4": isMobile,
        "py-2": isMobile && isY,
        // "sm:px-2": !isMobile,
        // "sm:py-4": !isMobile && isY,
        "px-12": !isMobile,
        "py-4": !isMobile && isY,
      }, props.className)}
      onClick={props.onClick}
    >{props.children}</div>
  )
}
