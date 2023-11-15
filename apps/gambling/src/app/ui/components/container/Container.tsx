import cx from "classnames";
import useBreakpoint from "../../hooks/useBreakpoint";

type IContainer = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
export const Container = (props: IContainer) => {
  const {isMobile} = useBreakpoint();
  return (
    <div
      className={cx({
        "px-3 py-2": isMobile,
        "sm:px-2 sm:py-4": !isMobile,
        "md:px-12 md:py-4": !isMobile,
      }, props.className)}
      onClick={()=>props.onClick}
    >{props.children}</div>
  )
}
