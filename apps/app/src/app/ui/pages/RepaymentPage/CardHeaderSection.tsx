type ICardHeader = {
  statusBackground: string;
  iconUrl: string;
  productName: string;
  statusColor: string;
  statusName: string;
};
export const CardHeaderSection = (props: ICardHeader) => {
  return (
    <div
      className={`mb-2 flex flex-row items-center justify-between rounded-t-lg px-3 py-2 ${props.statusBackground}`}
    >
      <div className="flex flex-row items-center">
        <div className="mr-2 h-6 w-6 ">
          <img src={props.iconUrl} alt="logo" />
        </div>
        <div className="text-ctext-primary text-sm font-bold">
          {props.productName ?? ''}
        </div>
      </div>
      <div className={`text-xs font-bold ${props.statusColor}`}>
        {props.statusName}
      </div>
    </div>
  );
};
