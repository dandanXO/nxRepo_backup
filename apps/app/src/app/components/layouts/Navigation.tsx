import {IoChevronBack} from "react-icons/all";

interface Props {
  title?: string;
  back: () => void;
}
export const Navigation = (props: Props) => {
  return (
    <div className={"navigation h-14 flex flex-row justify-start items-center"}>
      <div className={"mx-3"}>{typeof props.back !== "undefined" && (<IoChevronBack size={20}/>)}</div>
      <div className={"font-normal"}>{props.title}</div>
    </div>
  )
}
