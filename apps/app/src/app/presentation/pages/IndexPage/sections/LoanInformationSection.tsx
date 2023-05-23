import { AiOutlineFieldTime } from '@react-icons/all-files/ai/AiOutlineFieldTime';
import { GiPowderBag } from '@react-icons/all-files/gi/GiPowderBag';

import { IndexPageProps } from '../../../../reduxStore';

type Props = IndexPageProps;

export const LoanInformationSection = (props: Props) => {
  return (
    <div data-testing-id="adProductInfo" className={'ad flex flex-row justify-around'}>
      <div className={'flex flex-row'}>
        <div className={'flex flex-col justify-center'}>
          <div className={'mr-3'}>
            <GiPowderBag size={30} />
          </div>
        </div>

        <div className={'info pt-1'}>
          <div className={'name'}>Interest rate</div>
          {/*NOTICE: FIX to text-md because admin*/}
          <div className={'value text-md'}>{props.state.openIndexAPI?.interestRate}</div>
        </div>
      </div>

      <div className={'flex flex-row justify-center'}>
        <div className={'flex flex-col justify-center'}>
          <div className={'mr-3'}>
            <AiOutlineFieldTime size={30} />
          </div>
        </div>

        <div className={'info pt-1'}>
          <div className={'name'}>Loan Term</div>
          {/*NOTICE: FIX to text-md because admin*/}
          <div className={'value text-md'}>{props.state.openIndexAPI?.loanTerms}</div>
        </div>
      </div>
    </div>
  );
};
