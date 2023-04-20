import {useMemo} from "react";

type IFindIBANLinkText = {
  type: "bankcard" | "wallet";
}
export const FindIBANLinkText = (props: IFindIBANLinkText) => {
  const url = useMemo(() => {
    return {
      "bankcard": "https://tinyurl.com/45vrsx48",
      "wallet": "https://tinyurl.com/2f4v2xmr",
    }[props.type]
  }, [props.type])

  return (
    <a href={url}>Click me to learn where can I find my IBAN number?</a>
  )
}
