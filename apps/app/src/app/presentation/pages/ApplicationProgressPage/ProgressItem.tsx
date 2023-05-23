interface Props {
  title?: string;
  content?: string;
  date?: string;
}
export const ProgressItem = (props: Props) => {
  return (
    <div className={'list flex flex-col mb-4'}>
      <div className={'item px-4 py-2 border-[1.5px] border-gray-500 rounded-md flex flex-col'}>
        <div className={'title font-medium mb-1'}>{props.title}</div>
        <div className={'content font-light leading-4 mb-2'}>{props.content}</div>
        <div className={'date text-gray-400 text-sm font-extralight'}>{props.date}</div>
      </div>
    </div>
  );
};
