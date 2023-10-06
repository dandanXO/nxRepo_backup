import { IndexPageProps } from '../../reduxStore';

type Props = IndexPageProps;

export const Marquee = (props: Props) => {
  return (
    <div
      data-testing-id="marquee"
      className={' marquee bg-cstate-warning-main h-7 overflow-hidden p-1 px-3'}
    >
      <div className={'animate-marquee whitespace-nowrap'}>
        {props.state.sharedIndex?.marquee}
      </div>
    </div>
  );
};
