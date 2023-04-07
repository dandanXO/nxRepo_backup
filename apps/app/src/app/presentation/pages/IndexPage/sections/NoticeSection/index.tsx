import {ReactNode} from "react";
interface Props {
  children?: ReactNode;
}
export const NoticeSectionContainer = (props: Props) => {
  return (
    <div className={"text-center mt-3 px-3 flex flex-col justify-center align-middle"}>
      {props.children}
    </div>
  )
}
