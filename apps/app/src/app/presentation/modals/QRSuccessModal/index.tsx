import { Button } from '../../components/layouts/Button';
import { useCallback } from 'react';

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
        'loan-agreement-modal sticky top-0 bottom-0 z-10 flex h-screen w-screen flex-col items-center justify-center bg-black bg-opacity-80 p-5'
      }
    >
      <div className={'modal-inner w-11/12 rounded-lg bg-white px-3 py-4 text-center'}>
        <div className={'mb-3 flex flex-col items-center font-medium'}>
          <div>Your loan application</div>
          <div>has been submitted</div>
        </div>

        <div className={'mb-3 flex flex-col font-light'}>
          <div className={'mb-3'}>The loan amount will be based on the latest review result.</div>
          <div>
            Please be patient and wait for the review result. You can check the order in the loan records later.
          </div>
        </div>

        <div>
          <Button text={'OK'} onClick={onClickClose} />
        </div>
      </div>
    </div>
  );
};
