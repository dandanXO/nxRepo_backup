import {environment} from "../../../environments/environment";
import {IUserInfo} from "../IUserInfo";

export type UserLoginLocalstorage = {
  token: string;
  kPassword: string;
  kPhone: string;
  connection: {
    "ip": string;
    "port": number;
    "server_id": number;
    "api": string;
  };
  userinfo: IUserInfo;
  bank: any;
  ip: string;
  getInviteConfigLocal: {
    "time": string;
    "data": {
      "id": number,
      "proxyType": number;
      "firstRecharge": number;
      "bindReward": number;
      "level1FlowRate": number;
      "level2FlowRate": number;
      "level3FlowRate": number;
      "level1RewdRate": string;
      "level2RewdRate": string;
      "level3RewdRate": string;
      "fbFlag": number;
      "googleFlag": number;
      "phoneFlag": number;
      "level1RewdRateDisplay": any,
      "jobPeriod": number;
      "firstRechargeLevel": {
        "num": string;
        "reward": string;
      }[];
      "level1FlowRateDisplay": number;
      "level2FlowRateDisplay": number;
      "level3FlowRateDisplay": number;
      "level2RewdRateDisplay": null,
      "level3RewdRateDisplay": null
    }[];
  }
  getBoxInfoLocal: {
    "time": string;
    "data": number;
  };
}

const token = "183520:1697429775:3001:3ed8a59c537330a8894bd9fce10fea29"
const kPassword = "andy5412";
const kPhone = "1234567893"
const connection = {
  "ip": "wss://m.bmw777slots.com/websocket",
  "port": 3001,
  "server_id": 100,
  "api": "http://192.168.0.33:3001/api"
};

const userinfo = {
  "client_ip": "125.229.69.197",
  "user_id": 183520,
  "nickname": "G183520",
  "avatar": "2",
  "fb_avatar": "",
  "phone": "1234567893",
  "pay_account_id": 0,
  "vip_level": 0,
  "vip_level_max": 0,
  "card_back": 0,
  "avatar_frame": 0,
  "app_package_name": "com.slots.big",
  "bind": [1],
  "invite_user_id": "",
  "invite_code": "fxnk9m24",
  "invite": {},
  "is_register": 0,
  "enable": 1,
  "recharge_amount": 0,
  "withdraw_amount": 0,
  "s_player": 0,
  "c_player": 0,
  "withdraw_model": 1,
  "total_rounds": 0,
  "bind_bank_reward": 0,
  "first_rw_reward": 0,
  "withdraw_control": -1,
  "created_at": 1696919651,
  "ab": "A",
  "ab_open": 0,
  "alterarImg": `https://ds.bmw777slots.com/assets/${environment.uVersion}/alterar_2.9083d2ef.png`
}
const bank = {}
const ip = "wss://m.bmw777slots.com/websocket";
const getInviteConfigLocal = {
  "time": "10/16/2023, 12:46:16 PM",
  "data": [{
    "id": 1,
    "proxyType": 0,
    "firstRecharge": 0,
    "bindReward": 0,
    "level1FlowRate": 0,
    "level2FlowRate": 0,
    "level3FlowRate": 0,
    "level1RewdRate": "",
    "level2RewdRate": "",
    "level3RewdRate": "",
    "fbFlag": 0,
    "googleFlag": 0,
    "phoneFlag": 1,
    "level1RewdRateDisplay": null,
    "jobPeriod": 7,
    "firstRechargeLevel": [{
      "num": "1",
      "reward": "1500"
    }, {
      "num": "11",
      "reward": "2000"
    }, {
      "num": "21",
      "reward": "2500"
    }],
    "level1FlowRateDisplay": 10000,
    "level2FlowRateDisplay": 10000,
    "level3FlowRateDisplay": 10000,
    "level2RewdRateDisplay": null,
    "level3RewdRateDisplay": null
  }, {
    "id": 2,
    "proxyType": 1,
    "firstRecharge": 0,
    "bindReward": 0,
    "level1FlowRate": 5,
    "level2FlowRate": 2,
    "level3FlowRate": 1,
    "level1RewdRate": "[{\"amount\":0,\"rate\":0},{\"amount\":500000,\"rate\":0},{\"amount\":2000000,\"rate\":0},{\"amount\":5000000,\"rate\":0},{\"amount\":10000000,\"rate\":0},{\"amount\":30000000,\"rate\":0},{\"amount\":100000000,\"rate\":0}]",
    "level2RewdRate": "[{\"amount\":0,\"rate\":0},{\"amount\":500000,\"rate\":0},{\"amount\":2000000,\"rate\":0},{\"amount\":5000000,\"rate\":0},{\"amount\":10000000,\"rate\":0},{\"amount\":30000000,\"rate\":0},{\"amount\":100000000,\"rate\":0}]",
    "level3RewdRate": "[{\"amount\":0,\"rate\":0},{\"amount\":500000,\"rate\":0},{\"amount\":2000000,\"rate\":0},{\"amount\":5000000,\"rate\":0},{\"amount\":10000000,\"rate\":0},{\"amount\":30000000,\"rate\":0},{\"amount\":100000000,\"rate\":0}]",
    "fbFlag": 0,
    "googleFlag": 0,
    "phoneFlag": 1,
    "level1RewdRateDisplay": "0%-0%",
    "jobPeriod": 7,
    "firstRechargeLevel": "[{\"num\":\"1\",\"reward\":\"1500\"},{\"num\":\"11\",\"reward\":\"2000\"},{\"num\":\"21\",\"reward\":\"2500\"}]",
    "level1FlowRateDisplay": 10000,
    "level2FlowRateDisplay": 10000,
    "level3FlowRateDisplay": 10000,
    "level2RewdRateDisplay": "0%-0%",
    "level3RewdRateDisplay": "0%-0%"
  }]
}

const getBoxInfoLocal = {
  "time": "10/16/2023, 12:46:16 PM",
  "data": 0
}
