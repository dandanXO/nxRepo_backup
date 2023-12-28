import { ReactElement } from "react";
import cx from 'classnames';

interface IButton {
  onClick: () => void;
  text: string | ReactElement;
  className: string
}


export const Button = (props: IButton) => {
  return (
    <button
      onClick={props.onClick}
      className={cx(`text-white shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)]  relative flex flex-row justify-center cursor-pointer  rounded-[100px]`,
        props.className
      )}
    >
      {props.text}
    </button>
  )
}