import {PostRepayCreateResponse} from "../externel/backend/loanService/PostRepayCreateResponse";

export const openWindow = (url: string) => {
  // console.log('[repay] postRepayCreateRequest.props', props);
  // NOTE: iOS 放這段可以直接成功，但移動到 下方 promise，得加上 setTimeout 方能成功
  // window.open("http://www.google.com", "_self")
  // postRepayCreate(props)
  //   .unwrap()
  //   .then((data: PostRepayCreateResponse) => {

  // })

  // NOTE: 最初的 Android, For iOS,
  // window.location.href = data.nextUrl;
  // NOTE: 嘗試失敗 https://codeantenna.com/a/Cn5jLWH9gG
  // eslint-disable-next-line no-restricted-globals
  // location.href = data.nextUrl;
  // window.alert(data.nextUrl)
  // window.location.assign(data.nextUrl);
  // NOTE: 嘗試失敗 https://juejin.cn/s/ios%20window.location.href%20%E4%B8%8D%E8%B7%B3%E8%BD%AC
  // window.location.replace(data.nextUrl);
  // console.log("data.nextUrl:", data.nextUrl);
  // NOTE: For Android
  // window.open(data.nextUrl)
  // NOTE: 自己方式 For iOS and Android,
  setTimeout(() => {
    window.open(url, "_self");
  }, 0)
}
