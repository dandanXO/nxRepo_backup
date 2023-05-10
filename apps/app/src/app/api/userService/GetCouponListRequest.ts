export interface GetCouponListRequest {
  pageNumber: number; // 頁碼, default: 0
  pageSize: number; // 一頁幾筆紀錄, default: 10
  status: 'UNUSED' | 'USED' | 'EXPIRED' | 'USED_EXPIRE'; // 優惠卷狀態
}
