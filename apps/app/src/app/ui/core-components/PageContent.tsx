import { ReactNode } from 'react';
import { tcx } from '../../modules/ui/tailwindcss';
import {isShowNavigation} from "../../device/isShowNavigation";


interface Props {
  children?: ReactNode;
  className?: string;
}

export const PageContent = (props: Props) => {
  return (
    <div
      className={tcx(
        `flex flex-col overflow-auto p-4`,
        ['h-[calc(100vh-56px)] pt-0', isShowNavigation()],
        ['h-[100vh]', !isShowNavigation()],
        props.className
      )}
    >
      {props.children}
    </div>
  );
};
