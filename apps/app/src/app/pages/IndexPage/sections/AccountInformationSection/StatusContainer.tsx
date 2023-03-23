import {ReactNode} from "react";

interface Props {
  children?: ReactNode;
}
export const StatusContainer = (props: Props) => {
  return (
    <div className={"loan-amount flex flex-col p-2 text-center bg-orange-400 w-full rounded-t-lg"}>
      {props.children}
    </div>
  )
}
