import { IndexPageProps } from '../../reduxStore';

type Props = IndexPageProps;

export const Marquee = (props: Props) => {
  return (
    <div data-testing-id="marquee" className={' marquee h-7 overflow-hidden bg-cstate-warning-main p-1 px-3'}>
      <div className={'animate-marquee whitespace-nowrap'}>{props.state.sharedIndex?.marquee}</div>
    </div>
  );
};