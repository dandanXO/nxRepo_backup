import { useCallback } from 'react';

import { Button } from '../../components/layouts/Button';

type Props = {
  onClose: () => void;
};
export const QRSuccessModal = (props: Props) => {
  const onClickClose = useCallback(() => {
    props.onClose();
  }, []);
  return (
    <div
      className={
        'loan-agreement-modal fixed top-0 bottom-0 z-10 flex h-screen w-screen flex-col items-center justify-center bg-black bg-opacity-80 p-5'
      }
    >
      <div className={'modal-inner w-11/12 rounded-lg bg-white px-3 py-6 text-center'}>
        <div className={'flex flex-col items-center font-bold text-base'}>
          <div>Successful Application</div>
        </div>

        <div className={'my-5 flex flex-col font-light font-sm text-ctext-secondary leading-none'}>
          <div>Your loan application has been received successfully.</div>
          <div className={'my-3'}>Please note that loan disbursement may fail due to credit limit or bank-related issues. In such cases, please update your bank account/e-wallet information in the app.</div>
          <div>The final loan amount will be based on the latest review result.</div>
        </div>

        <div>
          <Button text={'OK'} onClick={onClickClose} />
        </div>
      </div>
    </div>
  );
};
