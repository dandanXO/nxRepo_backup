import { useNavigate } from 'react-router';
import { Button } from '../../core-components/Button';
import Modal from '../../core-components/Modal';
import { CloseButton } from '../../core-components/CloseButton';
import { modalSlice } from '../../../reduxStore/modalSlice';
import { useDispatch } from 'react-redux';
import ThankYouIcon from './ThankYouIcon';
import { PagePathEnum } from '../../pages/PagePathEnum';
import { getToken } from '../../../modules/querystring/getToken';

const StarRatingSuccessModal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(modalSlice.actions.updateStarRatingSuccessModal({ show: false }));
    }

    const handleOK = () => {
        navigate(`${PagePathEnum.IndexPage}?token=${getToken()}`);
        handleClose();
    }

    return (
        <Modal className='relative'>
            <div onClick={handleClose}>
                <CloseButton />
            </div>
            <div className='p-6 pb-4 flex flex-col justify-center items-center'>
            <ThankYouIcon/>
            <div className='text-base font-bold text-ctext-primary m-4'>Thank you!</div>
            <div className='text-sm text-ctext-secondary mb-2'>Your feedback was submitted successfully.</div>
            <div className='text-sm text-ctext-secondary mb-4'>It will help us in improving App.</div>
            <Button
                    text={'OK'}
                    onClick={handleOK}
                />
            </div>
        </Modal>
    );
};

export default StarRatingSuccessModal;

