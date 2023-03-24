import {ReactNode} from "react";

interface Props {
  children?: ReactNode;
}
export const PageContent = (props: Props) => {
  return (
    <div className={"px-3"}>{props.children}</div>
  )
}
