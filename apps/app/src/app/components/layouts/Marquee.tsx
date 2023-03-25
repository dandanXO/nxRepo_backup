import {IndexPageProps} from "../../store";

type Props = IndexPageProps;

export const Marquee = (props: Props) => {
  return (
    <div className={"marquee h-7 p-1 bg-orange-300 px-3"}>{props.state.indexAPI?.marquee}</div>
  )
}
