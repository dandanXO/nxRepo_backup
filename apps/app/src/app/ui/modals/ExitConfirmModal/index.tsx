import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { RootState } from '../../../reduxStore';
import { modalSlice } from '../../../reduxStore/modalSlice';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import { Button } from '../../core-components/Button';
import Modal from '../../core-components/Modal';

const ExitConfirmModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { app } = useSelector((state: RootState) => state);

  const handleClose = () => {
    dispatch(modalSlice.actions.updateExitConfirmModal({ show: false }));
  };

  const handleLeaveApp = () => {
    navigate(`${PageOrModalPathEnum.LoginPage}`);
  };

  return (
    <Modal className="relative">
      <div className="p-4">
        <div className="text-ctext-primary text-left text-base font-bold">
          Confirm Exit?
        </div>
        <div className="text-ctext-secondary my-5 text-left text-sm">{`Are you sure you want to exit ${app.androidAppInfo?.appName}?`}</div>
        <div className="flex">
          <Button
            className={`mr-1 w-full`}
            onClick={handleClose}
            text={'No'}
            type={'primary'}
          />
          <Button
            className={`ml-1 w-full`}
            text={'Yes'}
            onClick={handleLeaveApp}
            type={'ghost'}
            ghostTheme={'tertiary'}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ExitConfirmModal;
