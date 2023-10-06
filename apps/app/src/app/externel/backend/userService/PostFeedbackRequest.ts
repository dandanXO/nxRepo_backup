export interface PostFeedbackRequest {
  category: number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7; // 问题分类
  feedback: string; // 用戶回饋內容
}
