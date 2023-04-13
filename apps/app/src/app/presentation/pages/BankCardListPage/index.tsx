import BankCard from "./BankCard";
import NoDataIcon from '../../components/images/NoData.svg';
import { useNavigate } from "react-router";
import { useLazyGetBankCardListQuery } from "../../../api/rtk";
import { useEffect, useState } from "react";
import { Navigation } from "../../components/layouts/Navigation";
import { usePostBankCardMainMutation } from "../../../api/rtk";
import { SetPrimarySuccessModal } from "./SetPrimarySuccessModal";
import { getToken } from "../../../api/base/getToken";
export const BankCardListPage = () => {
    const navigate = useNavigate();

    const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetBankCardListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });

    const [postBankCardMain, { isSuccess: isPostBankCardMainSuccess }] = usePostBankCardMainMutation();
    const [isSetPrimarySuccess, setIsSetPrimarySuccess] = useState(false);

    useEffect(() => {
        triggerGetList(null);
    }, [isPostBankCardMainSuccess])

    const renderNodata = () => {
        return <div className={`grow flex flex-col px-8 items-center justify-center grow text-center`}>
            <div className={`flex w-40 justify-center`}>  <img src={NoDataIcon} /> </div>
            <div className={`w-40 mb-5 mt-12 font-bold`}>{'No bank card added'}</div>
            <div className={`text-xs text-slate-500`}>{'You must be verified to add a card, please return to the home page and click "Apply Now" to verify your eligibility.'}</div>
        </div>
    }

    const handleSetPrimary = (bankId: number) => {
        if (!bankId) return;
        postBankCardMain({ bankId }).unwrap().then(() => {
            setIsSetPrimarySuccess(true);
        }).catch((e) => { console.log(e) })
    }


    return (
        <div className={`flex flex-col h-screen`}>
            {isSetPrimarySuccess && <SetPrimarySuccessModal setIsSetPrimarySuccess={setIsSetPrimarySuccess} />}
            <Navigation title={"Bank Card"} back={() => { navigate(-1) }} />
            {
                currentData && currentData.bankAccounts.length !== 0 ?
                    <>
                        <div className={`grow`}>
                            {currentData && currentData?.bankAccounts?.map(card => {
                                return <BankCard
                                    cardName={card.bankName ?? ''}
                                    isMainCard={card.main ?? false}
                                    cardNo={card.bankAccount ?? ''}
                                    handleSetPrimary={() => handleSetPrimary(card.bankId ?? 0)} />
                            })}
                        </div>
                        <div className={`flex items-center justify-center flex-col`} >
                            <div onClick={() => navigate(`/bind-bankcard?token=${getToken()}`)} className={`flex justify-center items-center border border-solid border-orange-500 text-orange-500 text-2xl w-6 h-6  rounded font-bold mb-3`}>
                                +
                            </div>
                            <div className={`text-sm pb-8`}>Add A New Card</div>
                        </div>
                    </>
                    : renderNodata()
            }
        </div>
    )
}
