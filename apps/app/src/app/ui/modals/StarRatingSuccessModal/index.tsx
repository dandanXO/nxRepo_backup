import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { getToken } from '../../../application/getToken';
import { modalSlice } from '../../../reduxStore/modalSlice';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import { Button } from '../../core-components/Button';
import { CloseButton } from '../../core-components/CloseButton';
import Modal from '../../core-components/Modal';
import ThankYouIcon from './ThankYouIcon';

const StarRatingSuccessModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(modalSlice.actions.updateStarRatingSuccessModal({ show: false }));
  };

  const handleOK = () => {
    navigate(`${PageOrModalPathEnum.IndexPage}?token=${getToken()}`);
    handleClose();
  };

  return (
    <Modal className="relative">
      <div onClick={handleClose}>
        <CloseButton />
      </div>
      <div className="flex flex-col items-center justify-center p-6 pb-4">
        <ThankYouIcon />
        <div className="text-ctext-primary m-4 text-base font-bold">
          Thank you!
        </div>
        <div className="text-ctext-secondary mb-2 text-sm">
          Your feedback was submitted successfully.
        </div>
        <div className="text-ctext-secondary mb-4 text-sm">
          It will help us in improving App.
        </div>
        <Button text={'OK'} onClick={handleOK} />
      </div>
    </Modal>
  );
};

export default StarRatingSuccessModal;
