import {useMemo} from "react";

export const FindIBANLinkTextConstant = {
  bankcardURL: "https://tinyurl.com/45vrsx48",
  wallet: "https://tinyurl.com/2f4v2xmr",
}

type IFindIBANLinkText = {
  type: "bankcard" | "wallet";
}
export const FindIBANLinkText = (props: IFindIBANLinkText) => {
  // NOTE: 20230420 Android 目前只有還款頁面有支援跳轉瀏覽器
  const url = useMemo(() => {
    return {
      "bankcard": FindIBANLinkTextConstant.bankcardURL,
      "wallet": FindIBANLinkTextConstant.wallet,
    }[props.type]
  }, [props.type])

  return (
    <a style={{ color: "blue", textDecoration: "underline" }}>Click me to learn where can I find my IBAN number?</a>
  )
}
