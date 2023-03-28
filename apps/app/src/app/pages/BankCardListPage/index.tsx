import BankCard from "./BankCard";
import NoDataIcon from '../../components/images/NoData.svg';
import { useNavigate } from "react-router-dom";
import { useLazyGetBankCardListQuery } from "../../api";
import { useEffect } from "react";
export const BankCardListPage = () => {
    const navigate=useNavigate();
    const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetBankCardListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    useEffect(()=>{
        triggerGetList(null);
    },[])

    useEffect(()=>{
        console.log('currentData',currentData)
    },[currentData])
    const bankList = [
        { cardName: 'A New Card', cardStatus: 'Primary', cardNo: '**** **** **** 6789' },
        { cardName: 'yyb Pay', cardStatus: '', cardNo: '**** **** **** 3451' }
    ] as any[]

    const renderNodata = () => {
        return <div className={`grow flex flex-col px-8 items-center justify-center grow text-center`}>
            <div className={`flex w-40 justify-center`}>  <img src={NoDataIcon} /> </div>
            <div className={`w-40 mb-5 mt-12 font-bold`}>{'No bank card added'}</div>
            <div className={`text-xs text-slate-500`}>{'You must be verified to add a card, please return to the home page and click "Apply Now" to verify your eligibility.'}</div>


        </div>
    }
    return (
        <div className={`flex flex-col h-screen`}>
            {
                bankList.length === 0 ? renderNodata() :
                    <>
                        <div className={`grow`}>
                            {bankList?.map(card => {
                                return <BankCard cardName={card.cardName} cardStatus={card.cardStatus} cardNo={card.cardNo} />
                            })}
                        </div>
                        <div className={`flex items-center justify-center flex-col`} >
                            <div onClick={()=>navigate('/bind-bankcard')} className={`flex justify-center items-center border border-solid border-orange-500 text-orange-500 text-2xl w-6 h-6  rounded font-bold mb-3`}>
                                +
                            </div>
                            <div className={`text-sm pb-8`}>Add A New Card</div>
                        </div>
                    </>
            }
        </div>
    )
}
