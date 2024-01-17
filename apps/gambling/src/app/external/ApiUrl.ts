const DOWN_LOAD_URL = '/japi/invite/api/finger/download'  //  取得apk下載連結

// user
const REGISTER_URL = '/japi/user/register' // 註冊
const LOGIN_URL = '/japi/user/login'  // 登入
const FORGET_PASSWORD_URL = '/japi/user/forget-password'  // 忘記密碼
const GET_VIP_INFO_URL = '/japi/user/vip-info' // 取得VIP訊息

// mail
const GET_MAIL_COUNT_URL = '/japi/user/mail/info' // 取得未讀訊息數量
const POST_MAIL_READ_URL = (mailId: number) => `/japi/user/mail/read/${mailId}` // 設定訊息為已讀
const GET_MAIL_LIST_URL = '/japi/user/mail/list'  // 取得訊息列表

const GET_BOX_INFO_URL = '/japi/invite/boxConfig/boxInfo' // 取得寶箱歷程
const GET_BOX_RECEIVE_URL = '/japi/invite/boxConfig/boxReceive' // 領取寶箱
const GET_BOX_RECEIVE_RECORD_URL = '/japi/invite/boxConfig/boxReceiveRecord' // 取得寶箱領取紀錄

export {
  DOWN_LOAD_URL,
  FORGET_PASSWORD_URL,

  REGISTER_URL,
  LOGIN_URL,
  GET_VIP_INFO_URL,

  GET_MAIL_COUNT_URL,
  POST_MAIL_READ_URL,
  GET_MAIL_LIST_URL,

  GET_BOX_INFO_URL,
  GET_BOX_RECEIVE_URL,
  GET_BOX_RECEIVE_RECORD_URL,
}
