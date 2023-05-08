export type TraceBehaviorRequest = BehaviorLogRequest[];

export type BehaviorLogRequest = {
  actionType:
    | 'CLICK'
    | 'EXIT'
    | 'INPUT'
    | 'LAUNCH'
    | 'SCROLL'
    | 'VISIT'
    | 'ZOOM';
  // 客户行为
  content?: string;
  // 输入框内容(仅输入行为，其他为缺失)

  description?: string;
  // 埋点对应产品描述

  deviceCode: string;
  // 装置代码

  duration: number;
  // example: 20
  // 访问/输入时长(s) (点击为0)

  eventId: string;
  // 客户端埋点ID (页面/输入框/按钮)

  eventTime: number;
  // example: 1680780739
  // 访问/输入/点击起始时间 (unix time)

  pageDescription?: string;
  // 埋点所在页面描述

  phoneNo: string;
  // 用户电话号码
};
