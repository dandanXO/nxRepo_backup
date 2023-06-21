import {formatDate} from "../../../modules/format/formatDate";
import moment from 'moment-timezone';

interface Props {
  title?: string;
  content?: string;
  date?: string;
}
export const ProgressItem = (props: Props) => {
  return (
    <div className={'list mb-4 flex flex-col'}>
      <div className={'item flex flex-col rounded-md border-[1.5px] border-primary-main bg-primary-assistant px-4 py-2'}>
        <div className={'title mb-1 font-medium text-primary-main'}>{props.title}</div>
        <div className={'content mb-2 font-light leading-4'}>{props.content}</div>
        <div className={'date text-sm font-extralight text-gray-400'}>{props.date}</div>
      </div>
    </div>
  );
};
