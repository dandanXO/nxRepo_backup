import { CloseButton } from '../../components/layouts/CloseButton';
import { Navigation } from '../../components/layouts/Navigation';
import { useCallback } from 'react';
import { RootState } from '../../../reduxStore';
import { useSelector } from 'react-redux';

type Props = {
  onClose: () => void;
};
export const LoanAgreementModal = (props: Props) => {
  const onClickClose = useCallback(() => {
    props.onClose();
  }, []);
  const url = useSelector((state: RootState) => state.indexPage.indexAPI?.loanAgreementUrl);
  return (
    <div className={'loan-agreement-modal z-10 w-screen h-screen bg-white pt-5 absolute top-0 flex flex-col'}>
      <div className={'z-10'} onClick={onClickClose}>
        <CloseButton />
      </div>
      <div className={'mb-2'}>
        <Navigation title={'Loan Agreement'} />
      </div>
      <div className={'content'}>
        <iframe className="min-h-screen w-full" src={url} />
      </div>
    </div>
  );
};
