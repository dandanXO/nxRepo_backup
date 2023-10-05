import { formatDate } from "../../../modules/format/formatDate";
import moment from 'moment-timezone';
import cx from 'classnames'

interface Props {
  title?: string;
  content?: string;
  date?: string;
  isHightlight?: boolean;
}
export const ProgressItem = (props: Props) => {
  return (
    <div className={'list mb-4 flex flex-col'}>
      <div className={cx('item flex flex-col rounded-md border  px-5 py-3', {
        'border-primary-main bg-primary-assistant': props.isHightlight,
        'border-cstate-disable-main': !props.isHightlight,
      })}>
        <div className={cx('title font-bold text-sm', {
          'text-primary-main': props.isHightlight,
          'text-cstate-disable-main': !props.isHightlight,
        })}>{props.title}</div>
        <div className={cx('content my-3 text-sm leading-none', {
          'text--ctext-primary': props.isHightlight,
          'text-cstate-disable-main': !props.isHightlight,
        })}>{props.content}</div>
        <div className={cx('date text-xs font-extralight', {
          'text-ctext-secondary': props.isHightlight,
          'text-cstate-disable-main': !props.isHightlight,
        })}>{moment(props.date).format('DD-MM-YYYY HH:mm:ss')}</div>
      </div>
    </div>
  );
};
