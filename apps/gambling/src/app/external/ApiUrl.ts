const DOWN_LOAD_URL = '/japi/invite/api/finger/download'  //  取得apk下載連結

// user
const REGISTER_URL = '/japi/user/register' // 註冊
const LOGIN_URL = '/japi/user/login'  // 登入
const FORGET_PASSWORD_URL = '/japi/user/forget-password'  // 忘記密碼
const GET_VIP_INFO_URL = '/japi/user/vip-info' // 取得VIP訊息
const GET_GAME_RECORD_URL = '/japi/report/api/user/game-records' // 取得遊戲紀錄

// mail
const GET_MAIL_COUNT_URL = '/japi/user/mail/info' // 取得未讀訊息數量
const POST_MAIL_READ_URL = (mailId: number) => `/japi/user/mail/read/${mailId}` // 設定訊息為已讀
const GET_MAIL_LIST_URL = '/japi/user/mail/list'  // 取得訊息列表

// system
const GET_GLOBAL_CONFIG_URL = '/japi/user/global-config' // 獲取全局配置
const GET_MAINTENANCE_URL = '/japi/user/maintenance-config' // 取得維護資訊
const GET_RECHARGE_CONFIG_URL = '/japi/user/recharge-config' // 取得充值配置

// payment
const POST_RECHARGE_URL = '/japi/user/recharge' // 充值
const GET_RECHARGE_RECORD_URL = '/japi/user/recharge-list' // 取得充值紀錄
const GET_WITHDRAW_RECORD_URL = '/japi/user/withdraw-list'  // 取得提現紀錄
const GET_WITHDRAW_LIMIT_URL = '/japi/user/withdraw-limit'  // 取得提現限制
const GET_BANK_URL = '/japi/user/bank'  // 取得銀行資訊

// punch in
const POST_PUNCH_IN_URL = '/japi/user/punch-in' // 簽到
const GET_PUNCH_IN_CONFIG_URL = '/japi/user/punch-in-config' // 取得簽到配置

const GET_BOX_INFO_URL = '/japi/invite/boxConfig/boxInfo' // 取得寶箱歷程
const GET_BOX_RECEIVE_URL = '/japi/invite/boxConfig/boxReceive' // 領取寶箱
const GET_BOX_RECEIVE_RECORD_URL = '/japi/invite/boxConfig/boxReceiveRecord' // 取得寶箱領取紀錄

const GET_BOX＿INVITE_LIST_URL = '/japi/invite/boxConfig/boxInviteList'

export {
  DOWN_LOAD_URL,
  FORGET_PASSWORD_URL,

  REGISTER_URL,
  LOGIN_URL,
  GET_VIP_INFO_URL,
  GET_GAME_RECORD_URL,

  GET_MAIL_COUNT_URL,
  POST_MAIL_READ_URL,
  GET_MAIL_LIST_URL,

  GET_GLOBAL_CONFIG_URL,
  GET_MAINTENANCE_URL,
  GET_RECHARGE_CONFIG_URL,

  POST_RECHARGE_URL,
  GET_RECHARGE_RECORD_URL,
  GET_WITHDRAW_RECORD_URL,
  GET_WITHDRAW_LIMIT_URL,
  GET_BANK_URL,

  POST_PUNCH_IN_URL,
  GET_PUNCH_IN_CONFIG_URL,

  GET_BOX_INFO_URL,
  GET_BOX_RECEIVE_URL,
  GET_BOX_RECEIVE_RECORD_URL,
  GET_BOX＿INVITE_LIST_URL
}
