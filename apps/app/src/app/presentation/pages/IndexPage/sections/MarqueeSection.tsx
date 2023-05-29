import { IndexPageProps } from '../../../../reduxStore';
import { Marquee } from '../../../components/layouts/Marquee';

type Props = IndexPageProps;
export const MarqueeSection = (props: Props) => {
  return <Marquee state={props.state} />;
};
