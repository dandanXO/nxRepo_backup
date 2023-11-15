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
        "px-12 py-4": !isMobile,
      }, props.className)}
      onClick={()=>props.onClick}
    >{props.children}</div>
  )
}
