export type PayableRecords = {
  dueDate: string;
  // 訂單到期日 yyyy/MM/dd

  orderNo: string;
  // 订單號

  overdue: boolean;
  // 是否逾期

  payableAmount: number;
  // 應還金額

  productLogo: string;
  // 產品logo

  productName: string;
  // 產品名稱

  repayUrl: string;
  // 还款链结
}
