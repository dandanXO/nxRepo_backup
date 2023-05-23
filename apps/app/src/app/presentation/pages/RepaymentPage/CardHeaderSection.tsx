type ICardHeader = {
  statusBackground: string;
  iconUrl: string;
  productName: string;
  statusColor: string;
  statusName: string;
};
export const CardHeaderSection = (props: ICardHeader) => {
  return (
    <div className={`flex flex-row justify-between items-center mb-2 px-3 py-2 rounded-t-lg ${props.statusBackground}`}>
      <div className="flex flex-row items-center">
        <div className="w-6 h-6 mr-2 ">
          <img src={props.iconUrl} alt="logo" />
        </div>
        <div className="text-sm font-bold text-ctext-primary">{props.productName ?? ''}</div>
      </div>
      <div className={`text-xs font-bold ${props.statusColor}`}>{props.statusName}</div>
    </div>
  );
};
