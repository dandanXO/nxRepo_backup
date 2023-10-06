import {useCallback} from 'react';

import {CloseButton} from '../../core-components/CloseButton';
import {Horizontal} from '../../core-components/Horizontal';

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
        'loan-agreement-modal fixed top-0 bottom-0 z-10 flex h-full w-screen flex-col items-center justify-center bg-black bg-opacity-80 p-5'
      }
    >
      <div className={'modal-inner w-11/12 rounded-lg bg-white px-3 py-4'}>
        <div className={'relative mb-3 flex flex-col items-center font-medium'}>
          <div className={'z-10'} onClick={onClickClose}>
            <CloseButton />
          </div>
          <div className={'header-title'}>Authorization</div>
          <div className={'header-subtitle text-xs text-gray-500'}>may request access to</div>
        </div>

        <div className={'flex h-[400px] flex-col overflow-auto font-light'}>
          <div className={'mb-3'}>
            <div className={'title'}>Contact</div>
            <div className={'content text-xs text-gray-500'}>
              The loan amount will be based on the latest review result.
            </div>
          </div>

          <div className={'mb-3'}>
            <div className={'title'}>SMS</div>
            <div className={'content text-xs text-gray-500'}>
              We need your authorization to collect and upload SMS data to assist us in using the information you
              provide for credit scoring and risk assessment.{' '}
            </div>
          </div>

          <div className={'mb-3'}>
            <div className={'title'}>AppList</div>
            <div className={'content text-xs text-gray-500'}>
              We need your authorization to collect and upload the AppList to assist us in using the information you
              provide for credit scoring and risk assessment.{' '}
            </div>
          </div>

          <div className={'mb-3'}>
            <div className={'title'}>Photo</div>
            <div className={'content text-xs text-gray-500'}>
              We need your authorization to collect and upload photos to assist us in using the information you provide
              for credit scoring and risk assessment.{' '}
            </div>
          </div>

          <div className={'mb-3'}>
            <div className={'title'}>Phone State</div>
            <div className={'content text-xs text-gray-500'}>
              We need your authorization to collect and upload the phone state to assist us in using the information you
              provide for credit scoring and risk assessment.{' '}
            </div>
          </div>

          <div className={'description text-xs'}>
            We will only begin to access the data once you allow the permission, and will continue to collect and upload
            the data until your application is successfully submitted.
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
