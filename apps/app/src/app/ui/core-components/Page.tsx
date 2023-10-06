import cx from 'classnames';
import {ReactNode} from 'react';

export type Props = {
  children: ReactNode;
  className?: string;
};
export const Page = (props: Props) => {
  return <div className={cx('h-full', props.className)}>{props.children}</div>;
};

