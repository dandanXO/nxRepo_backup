import Tag from '../../components/Tag';

interface IBankCard {
  cardName: string;
  isMainCard: boolean;
  cardNo: string;
  handleSetPrimary: () => void;
}
const BankCard = ({ cardName, isMainCard, cardNo, handleSetPrimary }: IBankCard) => {
  const cardStyle = isMainCard ? 'border-orange-500 bg-orange-200' : 'border-slate-400 bg-slate-100';

  return (
    <div className={`m-4 border border-solid ${cardStyle} rounded-lg pl-6 pr-3 pt-4 pb-5`}>
      <div className={`mb-3 flex flex-row justify-between font-bold`}>
        <div className={`text-base`}>{cardName}</div>
        <div className={`text-xs ${isMainCard ? 'text-orange-400' : ''}`}>
          {!isMainCard ? <Tag text="Set Primary" onClick={handleSetPrimary} active={isMainCard} /> : 'Primary'}
        </div>
      </div>
      <div>{cardNo}</div>
    </div>
  );
};

export default BankCard;
