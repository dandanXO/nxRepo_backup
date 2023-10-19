import { MdAdd } from '@react-icons/all-files/md/MdAdd';
import cx from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { getToken } from '../../../application/getToken';
import { isShowNavigation } from '../../../device/isShowNavigation';
import {
  useLazyGetBankCardListQuery,
  usePostBankCardMainMutation,
} from '../../../externel/backend/rtk';
import { loadingSlice } from '../../../reduxStore/loadingSlice';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import { Navigation } from '../../core-components/Navigation';
import { Page } from '../../core-components/Page';
import { PageContent } from '../../core-components/PageContent';
import BankCard from './BankCard';
import { SetPrimarySuccessModal } from './SetPrimarySuccessModal';
import NoDataIcon from './images/NoData.svg';

const BankCardListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [
    triggerGetList,
    { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized },
  ] = useLazyGetBankCardListQuery({
    pollingInterval: 0,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  const [postBankCardMain, { isSuccess: isPostBankCardMainSuccess }] =
    usePostBankCardMainMutation();
  const [isSetPrimarySuccess, setIsSetPrimarySuccess] = useState(false);

  useEffect(() => {
    triggerGetList(null);
  }, [isPostBankCardMainSuccess]);

  useEffect(() => {
    dispatch(loadingSlice.actions.updatePageLoading(isFetching));
  }, [isFetching]);

  const renderNodata = () => {
    return (
      <PageContent className={'items-center justify-center'}>
        <div className={`flex w-40 justify-center`}>
          {' '}
          <img src={NoDataIcon} />{' '}
        </div>
        <div className={`mb-5 mt-12 w-40 font-bold`}>
          {'No bank card added'}
        </div>
        <div className={`text-xs text-slate-500`}>
          {
            'You must be verified to add a card, please return to the home page and click "Get my limit" to verify your eligibility.'
          }
        </div>
      </PageContent>
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
      {isSetPrimarySuccess && (
        <SetPrimarySuccessModal
          setIsSetPrimarySuccess={setIsSetPrimarySuccess}
        />
      )}
      <Navigation
        title={'Bank Card'}
        back={() => {
          navigate(
            `${PageOrModalPathEnum.PersonalInfoPage}?token=${getToken()}`
          );
        }}
      />
      {currentData &&
      currentData.bankAccounts &&
      currentData.bankAccounts.length !== 0 ? (
        <>
          <div
            className={cx(`overflow-auto`, {
              // NOTE: Navigation:56px , Add A New Card:103px
              'h-[calc(100%-56px-103px)] pt-0': isShowNavigation(),
              'h-[100%-103px]': !isShowNavigation(),
            })}
          >
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
              onClick={() =>
                navigate(
                  `${PageOrModalPathEnum.BindBankcard}?token=${getToken()}`
                )
              }
              className={`border-primary-main text-primary-main mb-3 flex h-6 w-6 items-center justify-center rounded border-2  border-solid text-2xl font-bold`}
            >
              <MdAdd className="fill-primary-main" />
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