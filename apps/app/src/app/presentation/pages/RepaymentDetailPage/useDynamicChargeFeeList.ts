import {GetLoanDetailResponse} from "../../../api/loanService/GetLoanDetailResponse";
import {GetLoanDetailChargeFeeDetailItems} from "../../../api/rtk/old/getLoanDetail";

export const useDynamicChargeFeeList = (originalTtems?: GetLoanDetailResponse["chargeFeeDetail"]["items"]) => {
  if(!originalTtems) return null;
  const items = JSON.parse(JSON.stringify(originalTtems));

  const lastChargeFeeKeyIndex = items.length - 1
  const lastChargeFeeKey: any = items[lastChargeFeeKeyIndex].key;

  if(lastChargeFeeKey) {

    let totalRemain = 0

    items.map((item: GetLoanDetailChargeFeeDetailItems) => {
      if(item.key !== lastChargeFeeKey) {
        const remain = parseFloat(item.value) % 10;
        item.value = String(parseFloat(item.value) - remain);
        totalRemain = totalRemain + remain;
      }
    })

    if(lastChargeFeeKey) {
      const item = items.find((item: GetLoanDetailChargeFeeDetailItems) => item.key === lastChargeFeeKey)
      if(item) {
        item.value = String(parseFloat(item.value) + totalRemain);
        totalRemain = 0;
      }
    }
  }

  return items;
}
