import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../reduxStore';
import { CloseButton } from '../../core-components/CloseButton';
import { Navigation } from '../../core-components/Navigation';

type Props = {
  onClose: () => void;
};
export const LoanAgreementModal = (props: Props) => {
  const onClickClose = useCallback(() => {
    props.onClose();
  }, []);
  const url = useSelector((state: RootState) => state.indexPage.indexAPI?.loanAgreementUrl);
  return (
      <div className={'loan-agreement-modal fixed top-0 z-10 flex h-screen w-screen flex-col bg-white'}>
          <div className={'mb-2'}>
              <div className={'z-20 fixed top-0 right-0'} onClick={onClickClose}><CloseButton /></div>
              <Navigation className={'pt-5'} title={'Loan Agreement'} />
          </div>
          <div className={'content flex-1'}>
              <iframe className="w-full h-full" src={url} />
          </div>
      </div>


  );
};
