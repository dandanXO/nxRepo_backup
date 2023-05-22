import { IndexPageProps } from '../../../../../reduxStore';

type Props = IndexPageProps;

export const UnAuthenticationStatus = (props: Props) => {
  return (
    <div className={'text-center'}>
      <div className={'text-white'}>Maximum Loan Amount up to</div>
      <div data-testing-id="loanableAmount" className={'text-white text-4xl'}>
        {/*// NOTICE: 資料會包含 ₹*/}
        {props.state.openIndexAPI?.loanQuotaAmount}
      </div>
    </div>
  );
};
