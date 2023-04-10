import {IoChevronBack} from "react-icons/all";

interface Props {
  title?: string;
  back?: () => void;
  to?:() => void;
  toIcon?:React.ReactElement | React.ReactElement[] | string;
}
export const Navigation = (props: Props) => {
  return (
    <div className={"navigation h-14 bg-white flex flex-row justify-between items-center sticky top-0 mx-3"}>
      {props.back && (
        <div onClick={() => {
          props.back && props.back();
        }}>{typeof props.back !== "undefined" && (<IoChevronBack size={20}/>)}</div>
      )}
      <div className={"font-normal font-medium grow mx-3"}>{props.title}</div>
      {props.to && (
        <div onClick={() => {
          props.to && props.to();
        }} >{typeof props.to !== "undefined" && (props.toIcon)}</div>
      )}
    </div>
  )
}