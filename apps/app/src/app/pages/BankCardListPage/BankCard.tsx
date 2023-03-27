import Tag from "../../components/Tag";

interface IBankCard {
    cardName: string;
    cardStatus: string;
    cardNo: string;
}
const BankCard = ({ cardName, cardStatus, cardNo }: IBankCard) => {

    const cardStyle = cardStatus === 'Primary' ? 'border-orange-500 bg-orange-200 text-orange-600' : 'border-slate-400 bg-slate-100 text-slate-400';
    const handleSetPrimary = () => {
        console.log('handleSetPrimary')
    }
    return <div className={`m-4 border border-solid ${cardStyle} pl-6 pr-3 pt-4 pb-5 rounded-lg`}>
        <div className={`flex flex-row justify-between font-bold mb-3`}>
            <div className={`text-base`}>{cardName}</div>
            <div className={`text-xs`}>{cardStatus !== 'Primary' ? <Tag text='Set Primary' onClick={handleSetPrimary} isActive={cardStatus === 'Primary'} /> : cardStatus}</div>
        </div>
        <div>{cardNo}</div>
    </div>
}

export default BankCard