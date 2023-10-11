import cx from 'classnames';

import { Props } from './Page';

export const TabPage = (props: Props) => {
  //NOTE: Tab Height: 63px
  return (
    <div className={cx('h-[calc(100% - 63px)]', props.className)}>
      {props.children}
    </div>
  );
};
