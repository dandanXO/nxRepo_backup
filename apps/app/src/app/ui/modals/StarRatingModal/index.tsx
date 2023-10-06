import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { USER_AUTH_STATE } from '../../../domain/user/USER_AUTH_STATE';
import { RootState } from '../../../reduxStore';
import { modalSlice } from '../../../reduxStore/modalSlice';
import { Button } from '../../core-components/Button';
import { CloseButton } from '../../core-components/CloseButton';
import Modal from '../../core-components/Modal';
import { useAppInfo } from '../../hooks/useAppInfo';
import { useMailToRUL } from '../../hooks/useMailToRUL';
import GrayStarIcon from './GrayStarIcon';
import StarIcon from './StarIcon';

const StarRatingModal = () => {
  const dispatch = useDispatch();
  const { indexPage } = useSelector((state: RootState) => state);

  const [ratingDisable, setRatingDisable] = useState(true);
  const [rating, setRating] = useState(0);

  const handleRateStar = (index: number) => {
    setRating(index);
    if (ratingDisable) {
      setRatingDisable(false);
    }
  };

  const handleClose = () => {
    dispatch(modalSlice.actions.updateStarRatingModal({ show: false }));
  };
  const mailContentName =
    indexPage.user.state === USER_AUTH_STATE.ready
      ? 'guest'
      : indexPage?.user?.bankCardName || '';
  const { mailToURL } = useMailToRUL(mailContentName);
  const { appID } = useAppInfo();

  const handleSubmitRating = () => {
    const appPlayStoreURL = `https://play.google.com/store/apps/details?id=${appID}`;

    window.location.href = rating <= 3 ? mailToURL : appPlayStoreURL;

    dispatch(modalSlice.actions.updateStarRatingModal({ show: false }));
    dispatch(modalSlice.actions.updateStarRatingSuccessModal({ show: true }));
  };

  return (
    <Modal className="relative">
      <div onClick={handleClose}>
        <CloseButton />
      </div>
      <div className="mt-8 flex justify-center p-2">
        {[1, 2, 3, 4, 5].map((i) => {
          return (
            <div className="mr-2" key={i} onClick={() => handleRateStar(i)}>
              {i <= rating ? <StarIcon /> : <GrayStarIcon />}
            </div>
          );
        })}
      </div>
      <div className="text-ctext-secondary text-xs">Tap a Star to Rate</div>
      <div className="text-ctext-primary m-3 text-sm">
        Rate Us 5 Stars on the App to Increase Your Approval Rate!
      </div>
      <div className="flex p-4">
        <Button
          className={`mr-1 w-full`}
          onClick={handleClose}
          text={'No, thanks'}
          type={'ghost'}
          ghostTheme={'tertiary'}
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
