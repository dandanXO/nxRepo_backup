import { IoChevronBack } from '@react-icons/all-files/io5/IoChevronBack';

interface Props {
  title?: string;
  back?: () => void;
  to?: () => void;
  toIcon?: React.ReactElement | React.ReactElement[] | string;
}
export const Navigation = (props: Props) => {
  return (
    <div className={'navigation sticky top-0 z-10 flex h-14 flex-row items-center justify-between bg-white px-3'}>
      {props.back && (
        <div
          onClick={() => {
            props.back && props.back();
          }}
        >
          {typeof props.back !== 'undefined' && <IoChevronBack size={20} />}
        </div>
      )}
      <div className={'mx-3 grow font-normal font-medium'}>{props.title}</div>
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
