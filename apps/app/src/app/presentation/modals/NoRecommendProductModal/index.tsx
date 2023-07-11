import { Button } from '../../components/layouts/Button';
import Modal from '../../components/Modal';
import { modalSlice } from '../../../reduxStore/modalSlice';
import { useDispatch } from 'react-redux';

const NoRecommendProductModal = () => {

    const dispatch = useDispatch();

    return (
        <Modal>
            <div className='px-3 py-6'>
                <div className='font-bold text-base text-ctext-primary'>No More Recommendations</div>
                <div className='text-sm text-ctext-secondary my-5 leading-none'>Ｗe have no more recommended products for you at this time.</div>
                <div className='text-sm text-ctext-secondary mb-4 leading-none'>Please wait for the countdown to end before reapplying. Once the countdown concludes, you can click the button to submit a new loan application.</div>
                <Button text={'OK'} onClick={() => dispatch(modalSlice.actions.updateNoRecommendProductModal({ show: false }))} />
            </div>

        </Modal >
    );
};

export default NoRecommendProductModal;

