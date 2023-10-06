export type GetFeedbackCategoriesResponse = FeedbackCategoryTemplate[];
export interface FeedbackCategoryTemplate {
  displayName: string; // 问题分类
  key: number; // 问题分类编号
  template: string; // 问题模板
}
