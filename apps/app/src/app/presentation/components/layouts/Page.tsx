import cx from 'classnames';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};
export const Page = (props: Props) => {
  return <div className={cx('container min-h-screen', props.className)}>{props.children}</div>;
};
