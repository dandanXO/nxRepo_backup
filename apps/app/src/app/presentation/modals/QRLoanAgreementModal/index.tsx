import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../reduxStore';
import { CloseButton } from '../../components/layouts/CloseButton';
import { Navigation } from '../../components/layouts/Navigation';

type Props = {
  onClose: () => void;
};
export const LoanAgreementModal = (props: Props) => {
  const onClickClose = useCallback(() => {
    props.onClose();
  }, []);
  const url = useSelector((state: RootState) => state.indexPage.indexAPI?.loanAgreementUrl);
  return (
    <div className={'loan-agreement-modal absolute top-0 z-10 flex h-screen w-screen flex-col bg-white pt-5'}>
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
