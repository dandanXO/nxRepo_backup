import { Marquee } from '../../../components/layouts/Marquee';
import { IndexPageProps } from '../../../../reduxStore';

type Props = IndexPageProps;
export const MarqueeSection = (props: Props) => {
  return <Marquee state={props.state} />;
};
