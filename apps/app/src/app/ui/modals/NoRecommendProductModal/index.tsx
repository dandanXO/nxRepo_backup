import { useDispatch } from 'react-redux';

import { modalSlice } from '../../../reduxStore/modalSlice';
import { Button } from '../../core-components/Button';
import Modal from '../../core-components/Modal';

const NoRecommendProductModal = () => {
  const dispatch = useDispatch();

  return (
    <Modal>
      <div className="px-3 py-6">
        <div className="text-ctext-primary text-base font-bold">
          No More Recommendations
        </div>
        <div className="text-ctext-secondary my-5 text-sm leading-none">
          Ｗe have no more recommended products for you at this time.
        </div>
        <div className="text-ctext-secondary mb-4 text-sm leading-none">
          Please wait for the countdown to end before reapplying. Once the
          countdown concludes, you can click the button to submit a new loan
          application.
        </div>
        <Button
          text={'OK'}
          onClick={() =>
            dispatch(
              modalSlice.actions.updateNoRecommendProductModal({ show: false })
            )
          }
        />
      </div>
    </Modal>
  );
};

export default NoRecommendProductModal;
