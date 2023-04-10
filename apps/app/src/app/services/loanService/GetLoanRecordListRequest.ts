export interface GetLoanRecordListRequest {
  pageNumber?: number;
  pageSize?: number;
  status: 'EXTEND'
    | 'OVERDUE'
    | 'PAY_OFF'
    | 'PROCESSING'
    | 'REJECTED'
    | 'UNPAID';
  // token:string;
}
