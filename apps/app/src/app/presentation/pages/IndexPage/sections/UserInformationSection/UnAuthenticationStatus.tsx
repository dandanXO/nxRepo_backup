import {IndexPageProps} from "../../../../../usecaseFlow/reduxStore";
import {formatPrice} from "../../../../../modules/formatPrice";

type Props = IndexPageProps;

export const UnAuthenticationStatus = (props: Props) => {
  return (
    <div className={"text-center"}>
      <div className={"text-white"}>Maximum Loan Amount up to</div>
      <div data-testing-id="loanableAmount" className={"text-white text-4xl"}>₹ {props.state.openIndexAPI?.loanQuotaAmount}</div>
    </div>
  )
}
