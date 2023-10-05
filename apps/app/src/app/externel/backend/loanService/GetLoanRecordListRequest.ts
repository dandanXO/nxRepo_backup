export interface GetLoanRecordListRequest {
  pageNumber?: number;
  pageSize?: number;
  status: 'UNPAID' | 'OVERDUE' | 'DONE';
  // token:string;
}
