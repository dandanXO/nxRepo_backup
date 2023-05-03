import Divider from "../../../../components/Divider";
import ListItem from "../../../../components/ListItem";
import {AmountPaidIcon,} from "@frontend/mobile/shared/ui";
import {Outlet, useLocation, useNavigate} from "react-router";
import {getToken} from "../../../../../modules/location/getToken";
import moment from "moment";
import {getOrderNo} from "../../../../../modules/location/getOrderNo";
import Money from "../../../../components/Money.tsx";
import {Button} from "../../../../components/layouts/Button";
import {GetLoanDetailChargeFeeDetailItems} from "../../../../../api/rtk/old/getLoanDetail";
import {Status} from "../../../../../modules/statusEnum";
import {alertModal} from "../../../../../api/base/alertModal";

const PakistanRepaymentDetailPage = (props: any) => {
  const navigate = useNavigate()
  const location = useLocation();
  const { currentData } = props || {};
  const {
    status='', productName = '', orderNo = '', dueDate = '',  overdueDays = '', paidAmount = '', repayRecords = [],
    totalRepayAmount = '', chargeFeeDetail = {}, extendDate = '', extensionFee = '', totalDueAmount = '', extendable,
    reductionAmount,
    penaltyInterest,
    loanAmount,
    dailyFee,
  } = currentData ?? {};
  const { items = [] } = chargeFeeDetail ?? {};

  const getItems = (field: string) => {
    return items.filter((i: GetLoanDetailChargeFeeDetailItems) => i.key === field)[0] || {}
  }
  console.log("getItems", items);

  // NOTE: 新版 h5 要過濾掉之前android需要的欄位, LOAN_AMOUNT 也不會給

  // NOTE: 前置利息
  const { value: serviceFee } = getItems('SERVICE_FEE');
  const { value: processingFee } = getItems('PROCESSING_FEE');

  // NOTICE: 動態欄位，但後端一定要給
  const { value: interest } = getItems('LOAN_INTEREST');

  // NOTE: 後置利息
  const { value: gatewayFee } = getItems('GATEWAY_FEE');
  const { value: creditApprovalFee } = getItems('CREDIT_APPROVAL_FEE');
  const { value: managementFee } = getItems('MANAGEMENT_FEE');

  // NOTE: 未知舊包參數
  // const { value: serviceFee } = getItems('SERVICE_FEE');
  // const { value: gst } = getItems('GST');

  const renderStatusTag = (status: string) => {
    return (
      <div className={`${Status(status)?.style} px-1`}>
        {Status(status)?.text}
      </div>
    )
  }
  return (
    <div>
      <div className={`px-6 pt-3`}>
        <ListItem title={'Product'} text={productName ?? ''} titleColor="text-black-400" />
        <ListItem title={'Order No.'} text={orderNo ?? ''} titleColor="text-black-400" />
        <ListItem title={'Status'} text={status ? renderStatusTag(status) : ''} titleColor="text-black-400" />
        <ListItem title={'Due Date'} text={dueDate ? moment(dueDate).format("DD-MM-YYYY") :''} titleColor="text-black-400" />

        {status === 'EXTEND' && (
          <ListItem title={'Extension Date'} text={extendDate ? moment(extendDate).format("DD-MM-YYYY") : ''} titleColor="text-black-400" />
        )}

        <ListItem title={'Loan Amount'} text={<Money money={loanAmount}/>} titleColor="text-black-400" />

        {items.map((item: any) => {
          if(!item) return null;
          let minus = false;
          if(item.key === "SERVICE_FEE" || item.key === "PROCESSING_FEE") {
            minus = true
          }
          return (
            <ListItem
              title={item.itemName}
              text={<Money money={minus ? "-" + item.value : item.value}/>}
              titleColor="text-black-400" />
          )
        })}

        <Divider />

        <ListItem title={'Daily Fee'} text={<div className="flex"><Money money={dailyFee}/></div>} titleColor="text-black-400" />

        <ListItem title={'Overdue Days'} text={overdueDays ?? ''} titleColor="text-black-400" textColor={status === 'OVERDUE' ? 'text-red-500' : ''} />
        <ListItem title={'Overdue Fee'} text={<Money money={penaltyInterest}/>} titleColor="text-black-400" textColor={status === 'OVERDUE' ? 'text-red-500' : ''} />

        {status === 'EXTEND' && (
          <ListItem title={'Extension Fee'} text={<Money money={extensionFee}/>} titleColor="text-black-400" />
        )}

        <Divider />

        <ListItem title={'Reduction Amount'} text={<div className="flex"> - <Money money={reductionAmount}/></div>} titleColor="text-black-400" />

        <ListItem
          titleColor="text-black-400"
          title={
            <div className={`flex flex-row item-center items-center`}>
              <div className={` mr-1`}>Amount Repaid</div>
              <div onClick={() => {
                navigate(`amount-repaid-record-modal?token=${getToken()}&orderNo=${getOrderNo()}`, {
                  state: { repayRecords }
                })
              }}><img src={AmountPaidIcon} />
              </div>
            </div>
          }
          text={<div className="flex"> - <Money money={paidAmount} /></div>}
        />

        <Divider />

        {/*NOTE: 總應還金額*/}
        {status !== 'EXTEND' &&
          (<ListItem
              title={'Repayment Amount'}
              text={<Money money={totalDueAmount} />}
              titleColor={status === "OVERDUE" ? "text-red-500" : "text-black"}
              fontWeight="font-bold"
            />
          )}

        <div className={`flex flex-row my-3 text-white`}>
          {extendable !== undefined && extendable && (
            <div onClick={() => {
              navigate(`extend-confirm-modal?token=${getToken()}&orderNo=${getOrderNo()}`, {
                state: currentData
              })}
            } className={`grow mr-1.5`}>
              <Button text={"Extend"} className={`bg-primary-variant`}/>
            </div>
          )}
          <div onClick={() => {
            if (currentData === undefined) return;
            navigate(`repayment-modal?token=${getToken()}&orderNo=${getOrderNo()}`, {
              state: currentData
            })}
          }  className={`grow ml-1.5`}>
            <Button text={"Repay"} className={`bg-primary-main`}/>
          </div>
        </div>

        {(status === "UNPAID" || status === "OVERDUE") &&
          <>
            <div className={`text-xs text-gray-400`}>
              <div>Attention：</div>
              <ul className="list-decimal list-outside pl-3 pt-1">
                <li>Before repayment, please make sure that you have enough balance on your bank account.</li>
                <li>Overdue for more than <span className={`text-primary-main`}>N days</span> will not be able to extend or re-loan，please ensure you make repayments on time to maintain uninterrupted access to our services.</li>
                <li>Email us if you have any questions about your responsibilities or for more information. <span className={`text-primary-main`}>mail@mail.com</span></li>
              </ul>
            </div>

            {/*TODO: 先兼容 querystring*/}
            <div className={`grow mt-2`} onClick={() => {
              navigate(`/v2/upload-payment-receipt?token=${getToken()}&orderNo=${getOrderNo()}`, {
                state: orderNo,
              })
            }}>
              <Button text={"Upload Receipt"} className={`border-primary-main border-[1.5px] border-solid text-primary-main w-full bg-none`} />
            </div>

            <div className={`flex flex-col my-3`}>
              <div className={`text-xs text-gray-400 `}>
                After completing the repayment, take a screenshot and upload your repayment receipt here.
              </div>
            </div>
          </>
        }

      </div>
      <Outlet />
    </div>
  )
}

export default PakistanRepaymentDetailPage;
