import {IndexPageProps} from "../../../../store";
import {formatPrice} from "../../../../modules/formatPrice";

type Props = IndexPageProps;

export const UnAuthenticationStatus = (props: Props) => {
  return (
    <div className={"text-center"}>
      <div className={"text-white"}>Maximum Loan Amount up to</div>
      <div className={"text-white text-4xl"}>₹ {formatPrice(props.state.indexAPI?.quotaBar.min || 0)}-{formatPrice(props.state.indexAPI?.quotaBar.max || 0)}</div>
    </div>
  )
}
