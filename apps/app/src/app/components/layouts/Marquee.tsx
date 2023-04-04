import {IndexPageProps} from "../../usecaseFlow/reduxStore";

type Props = IndexPageProps;

export const Marquee = (props: Props) => {
  return (
    <div data-testing-id="marquee" className={"marquee h-7 p-1 bg-orange-300 px-3"}>{props.state.sharedIndex?.marquee}</div>
  )
}
