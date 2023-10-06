import { IoChevronBack } from '@react-icons/all-files/io5/IoChevronBack';
import cx from 'classnames';

interface Props {
  title?: string | null;
  back?: () => void;
  to?: () => void;
  toIcon?: React.ReactElement | React.ReactElement[] | string;
  className?: string;
  backgroundColor?: string;
}
export const Navigation = (props: Props) => {
  const { className, backgroundColor } = props;
  return (
    <div
      className={cx(
        'navigation sticky top-0 z-10 flex h-14 flex-row items-center justify-between bg-white px-3',
        // 'navigation fixed top-0 left-0 right-0 100vw h-14 mb-[14px] z-10 flex flex-row items-center justify-between bg-white px-3',
        className,
        {
          'text-white': backgroundColor,
        }
      )}
      style={{ backgroundColor: backgroundColor }}
    >
      {props.back && (
        <div
          onClick={() => {
            props.back && props.back();
          }}
        >
          {typeof props.back !== 'undefined' && <IoChevronBack size={20} />}
        </div>
      )}
      <div className={'mx-3 grow font-bold'}>{props.title}</div>
      {props.to && (
        <div
          onClick={() => {
            props.to && props.to();
          }}
        >
          {typeof props.to !== 'undefined' && props.toIcon}
        </div>
      )}
    </div>
  );
};
