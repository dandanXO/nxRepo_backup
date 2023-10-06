import cx from 'classnames';

interface Props {
  title?: string;
  content?: string;
  date?: string;
  isHightLight?: boolean;
}
export const OrderStatusItem = (props: Props) => {
  return (
    <div
      className={cx('list mb-4 flex flex-col', {
        'bg-primary-assistant': props.isHightLight,
      })}
    >
      <div
        className={cx(
          'item flex flex-col rounded-md border-[1.5px] px-4 py-2 text-sm ',
          {
            'border-ctext-tertiary': !props.isHightLight,
            'border-primary-main': props.isHightLight,
          }
        )}
      >
        <div
          className={cx('title font-bold ', {
            'text-ctext-tertiary': !props.isHightLight,
            'text-primary-main': props.isHightLight,
          })}
        >
          {props.title}
        </div>
        <div
          className={cx('content my-3 text-sm font-light leading-4', {
            'text-ctext-tertiary': !props.isHightLight,
            'text-ctext-primary': props.isHightLight,
          })}
        >
          {props.content}
        </div>
        <div
          className={cx('date  text-xs font-extralight', {
            'text-ctext-tertiary': !props.isHightLight,
            'text-ctext-secondary': props.isHightLight,
          })}
        >
          {props.date}
        </div>
      </div>
    </div>
  );
};
