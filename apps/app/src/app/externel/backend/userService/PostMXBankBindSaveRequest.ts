export interface PostMXBankBindSaveRequest {
  bankAccount: string; // 銀行賬號
  bankCode: string; // 銀行代號
  bankName: string; // 銀行名稱
  cardType: 'CLABE' | 'DEBIT_CARD'; // 卡片類別
}
