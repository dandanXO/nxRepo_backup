import {Marquee} from "../../../components/layouts/Marquee";
import {IndexPageProps} from "../../../usecaseFlow/store";

type Props = IndexPageProps;
export const MarqueeSection = (props: Props) => {
  return (
    <Marquee state={props.state}/>
  )
}
