import { useNavigate } from 'react-router';
import { Button } from '../../components/layouts/Button';
import Modal from '../../components/Modal';
import { CloseButton } from '../../components/layouts/CloseButton';
import { RootState } from '../../../reduxStore';
import { modalSlice } from '../../../reduxStore/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import GrayStarIcon from './GrayStarIcon';
import StarIcon from './StarIcon';
import { useState } from 'react';
import { NativeAppInfo } from '../../../persistant/nativeAppInfo';

const StarRatingModal = () => {

    const dispatch = useDispatch();
    const { app } = useSelector((state: RootState) => state)


    const [ratingDisable, setRatingDisable] = useState(true);
    const [rating, setRating] = useState(0);

    const hadleRateStar = (index: number) => {
        setRating(index);
        if (ratingDisable) {
            setRatingDisable(false)
        }
    };

    const handleClose = () => {
        dispatch(modalSlice.actions.updateStarRatingModal({ show: false }));
    }

    const handleSubmitRating = () => {
        const herfUrl = rating <= 3 ?
            `mailto:${app?.init?.csEmail || ''}` :
            `https://play.google.com/store/apps/details?id=${NativeAppInfo.packageId}`;
        window.location.href = herfUrl;
        dispatch(modalSlice.actions.updateStarRatingModal({ show: false }));
        dispatch(modalSlice.actions.updateStarRatingSuccessModal({ show: true }));
    }



    return (
        <Modal className='relative'>
            <div onClick={handleClose}>
                <CloseButton />
            </div>
            <div className='flex justify-center p-2 mt-8'>
                {[1, 2, 3, 4, 5].map(i => {
                    return (<div className='mr-2' key={i} onClick={() => hadleRateStar(i)}>
                        {i <= rating ? <StarIcon /> : <GrayStarIcon />}
                    </div>)
                })
                }
            </div>
            <div className='text-xs text-ctext-secondary'>Tap a Star to Rate</div>
            <div className='text-sm text-ctext-primary m-3'>Share others your joy! Giving a 5-stars rating now!</div>
            <div className='flex p-4'>
                <Button className={`mr-1 w-full border-cstate-disable-main text-cstate-disable-main`}
                    onClick={handleClose}
                    text={'No, thanks'}
                    type={'ghost'}
                />
                <Button
                    className={`ml-1 w-full`}
                    text={'Rating'}
                    disable={ratingDisable}
                    onClick={handleSubmitRating}
                />
            </div>
        </Modal>
    );
};

export default StarRatingModal;

