import {IndexPageProps} from '../../../../reduxStore';
import {Marquee} from '../../../core-components/Marquee';

type Props = IndexPageProps;
export const MarqueeSection = (props: Props) => {
  return <Marquee state={props.state} />;
};
