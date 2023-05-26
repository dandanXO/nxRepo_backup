interface IBankCard {
  cardName: string;
  isMainCard: boolean;
  cardNo: string;
  handleSetPrimary: () => void;
}
const BankCard = ({ cardName, isMainCard, cardNo, handleSetPrimary }: IBankCard) => {
  const cardStyle = isMainCard ? 'border-primary-main bg-primary-assistant' : 'border-ctext-tertiary bg-cstate-disable-assistant';

  return (
    <div className={`my-3 mx-4 border border-solid ${cardStyle} rounded-lg pl-6 pr-3 pt-4 pb-5`}>
      <div className={`mb-3 flex flex-row justify-between font-bold items-baseline`}>
        <div className={`text-base`}>{cardName}</div>
        <div className={`text-xs ${isMainCard ? 'text-primary-main' : 'text-ctext-tertiary'}`}>
          {!isMainCard ? <button className='border border-solid border-ctext-tertiary rounded-2xl py-2 px-4' onClick={handleSetPrimary} >Set Primary</button> : <div className='pr-4'>Primary</div>}
        </div>
      </div>
      <div>{cardNo}</div>
    </div>
  );
};

export default BankCard;
