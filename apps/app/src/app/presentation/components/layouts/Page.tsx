import { ReactNode } from 'react';
import cx from 'classnames';
type Props = {
  children: ReactNode;
  className?: string;
};
export const Page = (props: Props) => {
  return <div className={cx('container min-h-screen', props.className)}>{props.children}</div>;
};
