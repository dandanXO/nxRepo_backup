import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { APIBoundaryModuleSlice } from '../../../reduxStore/apiBoundaryModuleSlice';
import { Button } from '../../core-components/Button';

type Props = {
  title?: string;
  message?: string;
};
const APIBoundaryModal = (props: Props) => {
  const dispatch = useDispatch();
  const onClickOK = useCallback(() => {
    dispatch(
      APIBoundaryModuleSlice.actions.update({
        show: false,
      })
    );
  }, []);
  return (
    <div
      className={
        'loan-agreement-modal sticky top-0 bottom-0 z-10 flex h-full w-screen flex-col items-center justify-center bg-black bg-opacity-80 p-5'
      }
    >
      <div className={'modal-inner w-11/12 rounded-lg bg-white px-3 py-4 text-center'}>
        <div className={'mb-3 flex flex-col items-center font-medium'}>
          <div>{props.title}</div>
        </div>

        <div className={'mb-3 flex flex-col font-light'}>
          <div>{props.message}</div>
        </div>

        <div>
          <Button text={'OK'} onClick={onClickOK} />
        </div>
      </div>
    </div>
  );
};
export default APIBoundaryModal;
