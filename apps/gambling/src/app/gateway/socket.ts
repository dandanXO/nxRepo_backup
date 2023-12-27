
import {Md5} from "ts-md5";
import {appStore, RootState} from "../reduxStore";
import {appSlice} from "../reduxStore/appSlice";
import {AppLocalStorage} from "../persistant/localstorage";
import {protoEncode} from "../external/websocket/protoEncode";
import {protoDecode} from "../external/websocket/protoDecode";

import { encode, decode } from 'js-base64';
import {onMessageError} from "../external/websocket/onMessageError";
import {onProtoMessage} from "../external/websocket/onProtoMessage";

const Base64 = {
  encode,
  decode,
}

const getUserStore = (): IUserStore=> {
  return (appStore.getState() as RootState).app.userStore as IUserStore;
}
const updateUserStore = (data: any) => {
  appStore.dispatch(appSlice.actions.setUserStore(data));
}

export type IUserStore = {
  userAmount: number;
  websocketTipsDialog: boolean;
  loadingShow: boolean;
  user: {
    token: string;
    withdrawAmount: number;
  },
  userinfo: {
    vip_level: any;
  },
  rechargeInfo: string;
  rechargeSuccessDialog: boolean;
  messageInfo: string;
  popCount: number;
  messageDialog: boolean;
  withdrawInfo: string;
  widthdrawSuccessDialog: boolean;
  isUpgrade: boolean;
  vipUpgrade: {
    show: boolean;
    totalReward: number;
    upLevelList: any;
  },
  balances: {
    type1: number;
    type2: number;
    type3: number;
  },
}




let $local = {
  set: (key: string, value: string) => {
    AppLocalStorage.setItem(key as any, value)
  },
  get: (key: string) => {
    return AppLocalStorage.getItem(key as any);
  },
  remove: (key: string) => {
    AppLocalStorage.removeItem(key as any)
  }
};

// TODO:
let router = {
  push: (path: string) => {
    console.log("[gateway] path: " + path)
  }
}

// TODO:
let toast$1 = {
  success: (message: string, {timeout}: {
    timeout: number,
  }) => {
    console.log("[gateway] message:", message)
    console.log("[gateway] timeout:", timeout)
  }
}



let ws: Socket;

export function connect(url: string, token: string): void {
  ws = new Socket(url, token);
}

export class Socket {
  url: string = "";
  token: string = "";
  ws: WebSocket | null = null;
  reLoginTimes: number = 3;
  reConnectTimes: number = 3;
  heartInterval: number = 10;

  timeHandle: number | null = null;

  constructor(url: string, token: string) {
    this.url = url;
    this.token = token;
    this.connect();
  }

  connect() {

    console.log("[gateway] [Socket] connect")
    this.ws = new WebSocket(this.url);
    this.creatorTime(true);

    this.ws.onopen = (event: Event) => {
      console.log("[gateway] [Socket] onopen")

      console.log({
        level: "debug",
        category: "Socket Open",
        // type: "open",
        // event_id?: string;
        // message: filePath,
        // data,
        // timestamp?: number;
      });

      this.onopen(event);

      window.addEventListener("offline", this.offline)
      window.addEventListener("online", this.online)
    };

    this.ws.onclose = (t: CloseEvent) => {
      console.log("[gateway] [Socket] onclose")
      console.log({
        level: "info",
        category: "Socket Close",
        // type,
        // event_id?: string;
        // message: filePath,
        // data,
        // timestamp?: number;
      })
      this.onclose(t);
    };

    this.ws.onmessage = (t: MessageEvent) => {
      try {
        console.log({
          level: "info",
          category: "Socket Message",
          message: JSON.stringify(t),
          // type,
          // event_id?: string;
          // data: JSON.stringify(t),
          // timestamp?: number;
        })
      } catch (e){
        console.log(e)
      }
      this.onmessage(t);
    };

    this.ws.onerror = (t: Event) => {
      try {
        console.log({
          level: "info",
          category: "Socket Error",
          message: JSON.stringify(t),
          // type,
          // event_id?: string;
          // data: JSON.stringify(t),
          // timestamp?: number;
        })
      } catch (e) {
        console.log(e)
      }
      this.onerror(t);
    };
  }

  online() {
    console.log("[gateway] [Socket] online")
    console.log({
      level: "info",
      category: "Socket Online",
      // message: JSON.stringify(t),
      // type,
      // event_id?: string;
      // data: JSON.stringify(t),
      // timestamp?: number;
    })
  }

  offline() {
    console.log("[gateway] [Socket] offline", ws)
    console.log({
      level: "info",
      category: "Socket Offline",
      // message: JSON.stringify(t),
      // type,
      // event_id?: string;
      // data: JSON.stringify(t),
      // timestamp?: number;
    })
    ws.close();
  }


  protoEncode(t: number, n: any){
    return protoEncode(t, n);
  }

  encode(t: number, n: any) {
    let o = this.protoEncode(t, n);
    let s = String.fromCharCode.apply(null, o);
    return Base64.encode(s);
  }

  onopen(event: Event) {
    // userStore$3.websocketTipsDialog = false;
    // userStore$3.loadingShow = false;

    updateUserStore({
      ...getUserStore(),
      websocketTipsDialog: false,
      loadingShow: false,
    })

    if (!(event != null && !Object.is(event.target, this.ws))) {
      this.stopTime();
      this.reLoginTimes = 3;
      this.reConnectTimes = 3;
      console.log("[gateway] this.token", this.token);
      this.send(100, {
        token: this.token,
      });
      this.creatorTime();
    }
  }

  send(t: number, n: any) {
    // console.log("[gateway] [send] protoid====", t);
    // console.log("[gateway] [send] 编码=============", n);
    // console.log("this.ws && this.ws.readyState", this.ws && this.ws.readyState);

    let o = this.encode(t, n);
    let s = Math.floor(new Date().getTime() / 1000);
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(
        JSON.stringify({
          msgtype: t,
          msg: o,
          time: s,
          sign: Md5.hashStr(`${t}${o}${s}vNqChg2BpMCoykK0`),
        })
      );
      return true;
    } else {
      return false;
    }
  }

  retry() {
    this.reLoginTimes--;

    setTimeout(() => {
      this.connect();
    }, 10000);

    if (this.reLoginTimes === -1) {
      // userStore$3.websocketTipsDialog = true;
      // console.log("[gateway] [websocket][104] userStore$3", userStore);
      updateUserStore({
        ...getUserStore(),
        websocketTipsDialog: true,
      })
    }
  }

  onclose(t: CloseEvent) {
    if (t != null && !Object.is(t.target, this.ws)) {
      this.close();
      this.retry();
    }
  }

  onerror(t: Event) {
    return t != null && Object.is(t.target, this.ws);
  }

  close() {
    if (this.ws) {
      console.log("[gateway] [Socket] close")

      console.log({
        level: "info",
        category: "Socket Close",
        // type: "close"
        // event_id?: string;
        // message: filePath,
        // data,
        // timestamp?: number;
      });

      this.ws.close();
      this.ws = null;
      this.stopTime();
      this.stopHeartTime();
    }
  }


  onmessage(t: MessageEvent) {
    if (t != null && !Object.is(t.target, this.ws)) {
      console.log("[gateway] SocketUtils onmessage() !this.socket");
      return;
    }
    let n = JSON.parse(t.data);
    if (n && n.errcode) {
      onMessageError(n);
      return;
    }
    this.decode(n, (o: any) => {
      if (o.protoid) {
        // console.log("[gateway] 解码==========", o);
        this.onProtoMessage(o);
      }
    });
  }

  decode(t: any, n: (o: any) => void) {
    let o = t.msgtype;
    let s: any = {};

    if (!t.msg) {
      s.protoid = o;
      n(s);
      return;
    }

    // let r = Base64.decode(t.msg);
    const r = atob(t.msg);

    // console.log("[gateway] r", r);
    let a: number[] = [];

    for (let l = 0; l < r.length; l++) {
      a.push(r.charCodeAt(l));
    }
    // console.log("[gateway] a", a);

    s.protoid = o;
    s.data = this.protoDecode(o, new Uint8Array(a));
    n(s);
  }

  onProtoMessage(t: {data?: any; protoid?: any;}) {
    return onProtoMessage({
      $local, getUserStore, t, updateUserStore, toast$1
    })
  }

  protoDecode(t: number, n: Uint8Array) {
    return protoDecode(t, n);
  }

  stopTime() {
    if (this.timeHandle !== null) {
      // console.log("[gateway] [Socket] stopTime")
      window.clearInterval(this.timeHandle);
      this.timeHandle = null;
    }
  }

  creatorTime(t: boolean = false) {
    let n = this;

    if (this.timeHandle == null) {
      if (t) {
        this.timeHandle = window.setInterval(function () {
          n.reConnectTimes-- > 0 && n.connect();
        }, this.heartInterval * 1000);
      } else {
        this.timeHandle = window.setInterval(function () {
          n.heartBeat();
        }, this.heartInterval * 1000);
      }
    }
  }

  heartBeat() {
    this.send(3, {});
  }

  stopHeartTime() {
    // console.log("[gateway] [Socket] stopHeartTime")
  }
}

