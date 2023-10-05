import {GetLoanDetailResponse} from "../../../../externel/loanService/GetLoanDetailResponse";
import {GetLoanDetailChargeFeeDetailItems} from "../../../../externel/rtk/old/getLoanDetail";
import {computeNumber} from "../../../../modules/computeNumber";

export const useDynamicChargeFeeList = (originalTtems?: GetLoanDetailResponse["chargeFeeDetail"]["items"]) => {
  // NOTE: 新版 h5 要過濾掉之前android需要的欄位, LOAN_AMOUNT 也不會給

  // NOTE: 前置利息
  // serviceFee
  // processingFee

  // NOTICE: 動態欄位，但後端一定要給
  // interest

  // NOTE: 後置利息
  // GATEWAY_FEE
  // CREDIT_APPROVAL_FEE
  // MANAGEMENT_FEE

  // NOTE: 未知舊包參數
  // const { value: serviceFee } = getItems('SERVICE_FEE');
  // const { value: gst } = getItems('GST');

  if(!originalTtems) return null;
  const items = JSON.parse(JSON.stringify(originalTtems));

  const lastChargeFeeKeyIndex = items.length - 1
  const lastChargeFeeKey: any = items[lastChargeFeeKeyIndex].key;

  if(lastChargeFeeKey) {

    let totalRemain = 0

    items.map((item: GetLoanDetailChargeFeeDetailItems) => {
      if(item.key !== lastChargeFeeKey) {
        const floatNumber = Number(item.value);
        const number = Math.floor(floatNumber);
        const float = computeNumber(floatNumber,"-", number).result;
        const ignoreOnesDigits = number % 10;
        const finalNumber = computeNumber(floatNumber, "-", ignoreOnesDigits).next("-", float).result;
        const remain = computeNumber(ignoreOnesDigits, "+", float).result;

        item.value = finalNumber.toString()
        totalRemain = computeNumber(totalRemain, "+", remain).result
      }
    })
    // console.log("totalRemain", totalRemain);
    if(lastChargeFeeKey) {
      const item = items.find((item: GetLoanDetailChargeFeeDetailItems) => item.key === lastChargeFeeKey)
      if(item) {
        item.value = computeNumber(item.value, "+", totalRemain).result;
        totalRemain = 0;
      }
    }
  }

  return items;
}
