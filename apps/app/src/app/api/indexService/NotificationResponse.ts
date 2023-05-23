export interface NotificationResponse {
    action: 'FORWARD_BROWSER'        //確認後動作
    | 'FORWARD_COUPON_PAGE'
    | 'FORWARD_CUSTOMER_SERVICE'
    | 'FORWARD_LOAN_RECORD'
    | 'MESSAGE';
    text: string;    //讯息
    title: string;   //标题
    webUrl: string;
}