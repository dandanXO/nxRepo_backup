import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { usePostTraceBehaviorMutation } from '../../../externel/backend/rtk';
import { getCurrentUnixTimestamp } from '../../../modules/timezone/getCurrentUnixTimestamp';
import { RootState } from '../../../reduxStore';
import { modalSlice } from '../../../reduxStore/modalSlice';
import { Button } from '../../core-components/Button';
import Modal from '../../core-components/Modal';

const PaymentProgressingModal = () => {
  const dispatch = useDispatch();
  const [postTraceBehaviour] =
    usePostTraceBehaviorMutation();

  const { init } = useSelector((state: RootState) => state.app);

  const handleClick = (buttonText: string) => {
    dispatch(modalSlice.actions.updatepaymentProgressingModal({ show: false }));
    const eventID =
      `Payment_Progressing_Modal_CLICK_${buttonText}`.toUpperCase();
    postTraceBehaviour([
      {
        deviceCode: 'deviceCode',
        phoneNo: init?.csContactNumber || 'phoneNo',
        eventId: eventID,
        actionType: 'CLICK',
        eventTime: getCurrentUnixTimestamp(),
        duration: 0,
      },
    ]);
  };

  return (
    <Modal className="relative">
      <div className="flex flex-col items-center justify-center p-6 pb-4">
        <div className="text-ctext-primary mb-4 text-base font-bold">
          Good News
        </div>
        <div className="text-ctext-secondary mb-2 text-sm leading-none">
          Payment is in progress.
        </div>
        <div className="text-ctext-secondary mb-2 text-sm leading-none">
          Once we confirm your payment, you can apply for a new loan
          application. This process takes 10 minutes.
        </div>
        <div className="text-ctext-secondary mb-6 text-sm leading-none">
          We encourage you to come back in 10 minutes and click the "Apply Now"
          button on the home page. We look forward to serving you again.
        </div>
        <div className="flex w-full">
          <Button
            className="mr-1 w-full"
            text={'Cancel'}
            type={'ghost'}
            ghostTheme={'tertiary'}
            onClick={() => handleClick('Cancel')}
          />
          <Button
            className="ml-1 w-full"
            text={'Booking Application'}
            onClick={() => handleClick('BookingApplication')}
          />
        </div>
      </div>
    </Modal>
  );
};

export default PaymentProgressingModal;
