import { environment } from "apps/gambling/src/environments/environment"
import cx from 'classnames';
import { ArrowRightOutlined } from "@ant-design/icons/lib/icons";
import { ReactElement } from "react";

interface IDesktopGameItemButton {
  onClick: () => void;
  className?: string;
  children: ReactElement | ReactElement[];
}


export const DesktopGameItemButton = (props: IDesktopGameItemButton) => {
  return (
    <button
      onClick={props.onClick}
      className={cx("w-[90px] h-[36px] text-white absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] flex flex-row justify-center items-center font-bold", props.className)}
    >
      {props.children}
    </button>
  )
}

