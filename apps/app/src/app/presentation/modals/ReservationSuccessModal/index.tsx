import { useNavigate } from 'react-router';
import { Button } from '../../components/layouts/Button';
import Modal from '../../components/Modal';
import { modalSlice } from '../../../reduxStore/modalSlice';
import { useDispatch } from 'react-redux';
import { PagePathEnum } from '../../pages/PagePathEnum';
import { getToken } from '../../../modules/querystring/getToken';
import { getOrderNo } from '../../../modules/querystring/getOrderNo';

const ReservationSuccessModal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
   
    const handleOK = () => {
        dispatch(modalSlice.actions.updateReservationSuccessModalgModal({ show: false }));
        navigate(`${PagePathEnum.RepaymentDetailPage}?token=${getToken()}?orderNo=${getOrderNo()}`);
        
    }

    return (
        <Modal className='relative'>
            <div className='p-6 pb-4 flex flex-col justify-center items-center'>
                <div className='text-base font-bold text-ctext-primary mb-4'>Reservation Success</div>
                <div className='text-sm text-ctext-primary mb-4 leading-none'>Congratulations! Your reservation is successful. </div>
                <div className='text-sm text-ctext-primary mb-8 leading-none'>After the order is confirmed, you can view it on the "Payment" page. The final outcome will be based on the audit results.</div>
                <Button text={'OK'} onClick={handleOK} />
            </div>
        </Modal>
    );
};

export default ReservationSuccessModal;

