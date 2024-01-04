import {twMerge} from "tailwind-merge";

type IBaseModal = {
  className?: string;
  children?: React.ReactElement;
  onClose?: (event: any) => void;
}
export const BaseModal = (props: IBaseModal) => {
  return (
    <div className={twMerge("z-[1005] fixed left-0 top-0 right-0 bottom-0 flex flex-col items-center justify-center bg-[rgba(0,0,0,0.65)]", props.className)} onClick={props.onClose}>
      {props.children}
    </div>
  )
}
