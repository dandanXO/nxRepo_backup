import { ReactNode } from 'react';

import { isShowNavigation } from '../../device/isShowNavigation';
import { tcx } from '../../modules/ui/tailwindcss';

interface Props {
  children?: ReactNode;
  className?: string;
}

export const PageContent = (props: Props) => {
  const showNavigation = isShowNavigation();
  return (
    <div
      className={tcx(
        `flex flex-col overflow-auto p-4`,
        ['h-[calc(100%-56px)] pt-0', showNavigation],
        ['h-full', !showNavigation],
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export const PageSection = (props: Props) => {
  return (
    <div className={tcx(`overflow-auto p-4`, props.className)}>
      {props.children}
    </div>
  );
};