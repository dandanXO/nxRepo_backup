import { ReactElement } from "react";

export const FragmentContainer = (props: { className: string; children: ReactElement[] }) => {
  return (<div className={props.className}>{props.children}</div>)
}