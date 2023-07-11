import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useLazyGetBankCardListQuery } from '../../../api/rtk';
import { usePostBankCardMainMutation } from '../../../api/rtk';
import { getToken } from '../../../modules/querystring/getToken';
import NoDataIcon from '../../components/images/NoData.svg';
import { Navigation } from '../../components/layouts/Navigation';
import { PagePathEnum } from '../PagePathEnum';
import BankCard from './BankCard';
import { SetPrimarySuccessModal } from './SetPrimarySuccessModal';
import { MdAdd } from '@react-icons/all-files/md/MdAdd';
import { loadingSlice } from '../../../reduxStore/loadingSlice';
import { useDispatch } from 'react-redux';
import { Page } from '../../components/layouts/Page';

const BankCardListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] =
    useLazyGetBankCardListQuery({
      pollingInterval: 0,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    });

  const [postBankCardMain, { isSuccess: isPostBankCardMainSuccess }] = usePostBankCardMainMutation();
  const [isSetPrimarySuccess, setIsSetPrimarySuccess] = useState(false);

  useEffect(() => {
    triggerGetList(null);
  }, [isPostBankCardMainSuccess]);

  useEffect(() => {
    dispatch(loadingSlice.actions.updatePageLoading(isFetching))
  }, [isFetching]);


  const renderNodata = () => {
    return (
      <div className={`flex grow grow flex-col items-center justify-center px-8 text-center`}>
        <div className={`flex w-40 justify-center`}>
          {' '}
          <img src={NoDataIcon} />{' '}
        </div>
        <div className={`mb-5 mt-12 w-40 font-bold`}>{'No bank card added'}</div>
        <div className={`text-xs text-slate-500`}>
          {
            'You must be verified to add a card, please return to the home page and click "Get my limit" to verify your eligibility.'
          }
        </div>
      </div>
    );
  };

  const handleSetPrimary = (bankId: number) => {
    if (!bankId) return;
    postBankCardMain({ bankId })
      .unwrap()
      .then(() => {
        setIsSetPrimarySuccess(true);
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  return (
    <Page>
      {isSetPrimarySuccess && <SetPrimarySuccessModal setIsSetPrimarySuccess={setIsSetPrimarySuccess} />}
      <Navigation
        title={'Bank Card'}
        back={() => {
          navigate(-1);
        }}
      />
      {currentData && currentData.bankAccounts && currentData.bankAccounts.length !== 0 ? (
        <>
          <div>
            {currentData &&
              currentData.bankAccounts &&
              currentData.bankAccounts.map((card) => {
                return (
                  <BankCard
                    key={card.bankId}
                    cardName={card.bankName ?? ''}
                    isMainCard={card.main ?? false}
                    cardNo={card.bankAccount ?? ''}
                    handleSetPrimary={() => handleSetPrimary(card.bankId ?? 0)}
                  />
                );
              })}
          </div>
          <div className={`flex flex-col items-center justify-center pt-4`}>
            <button
              onClick={() => navigate(`${PagePathEnum.BindBankcard}?token=${getToken()}`)}
              className={`mb-3 flex h-6 w-6 items-center justify-center rounded border-2 border-solid border-primary-main  text-2xl font-bold text-primary-main`}
            >
              <MdAdd className='fill-primary-main'/>
            </button>
            <div className={`pb-8 text-sm`}>Add A New Card</div>
          </div>
        </>
      ) : (
        renderNodata()
      )}
    </Page>
  );
};

export default BankCardListPage;
