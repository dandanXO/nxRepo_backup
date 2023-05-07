import { useCallback } from 'react';
import { Horizontal } from '../../components/layouts/Horizontal';
import { CloseButton } from '../../components/layouts/CloseButton';

type Props = {
  onClose: () => void;
  onConfirm: () => void;
};
export const AuthorizationModal = (props: Props) => {
  const onClickClose = useCallback(() => {
    props.onClose();
  }, []);

  return (
    <div
      className={
        'loan-agreement-modal z-10 w-screen h-screen bg-black bg-opacity-80 p-5 fixed top-0 bottom-0 flex flex-col justify-center items-center'
      }
    >
      <div className={'modal-inner w-11/12 px-3 py-4 bg-white rounded-lg'}>
        <div className={'font-medium mb-3 flex flex-col items-center relative'}>
          <div className={'z-10'} onClick={onClickClose}>
            <CloseButton />
          </div>
          <div className={'header-title'}>Authorization</div>
          <div className={'header-subtitle text-xs text-gray-500'}>
            may request access to
          </div>
        </div>

        <div className={'flex flex-col font-light h-[400px] overflow-auto'}>
          <div className={'mb-3'}>
            <div className={'title'}>Contact</div>
            <div className={'content text-xs text-gray-500'}>
              The loan amount will be based on the latest review result.
            </div>
          </div>

          <div className={'mb-3'}>
            <div className={'title'}>SMS</div>
            <div className={'content text-xs text-gray-500'}>
              We need your authorization to collect and upload SMS data to
              assist us in using the information you provide for credit scoring
              and risk assessment.{' '}
            </div>
          </div>

          <div className={'mb-3'}>
            <div className={'title'}>AppList</div>
            <div className={'content text-xs text-gray-500'}>
              We need your authorization to collect and upload the AppList to
              assist us in using the information you provide for credit scoring
              and risk assessment.{' '}
            </div>
          </div>

          <div className={'mb-3'}>
            <div className={'title'}>Photo</div>
            <div className={'content text-xs text-gray-500'}>
              We need your authorization to collect and upload photos to assist
              us in using the information you provide for credit scoring and
              risk assessment.{' '}
            </div>
          </div>

          <div className={'mb-3'}>
            <div className={'title'}>Phone State</div>
            <div className={'content text-xs text-gray-500'}>
              We need your authorization to collect and upload the phone state
              to assist us in using the information you provide for credit
              scoring and risk assessment.{' '}
            </div>
          </div>

          <div className={'description text-xs'}>
            We will only begin to access the data once you allow the permission,
            and will continue to collect and upload the data until your
            application is successfully submitted.
          </div>
        </div>

        <Horizontal />

        <div className={'flex flex-row justify-between font-light'}>
          <div onClick={props.onClose}>Cancel</div>
          <div onClick={props.onConfirm}>Confirm</div>
        </div>
      </div>
    </div>
  );
};
