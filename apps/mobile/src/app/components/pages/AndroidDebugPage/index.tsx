// @ts-ignore
window["onUploadKycBackgroundData"] = (uploaded: boolean) => {
  const message = !uploaded ? "尚未上傳" : "已上傳";
  alert(message)
}

export const AndroidDebugPage = () => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
    }}>
      {/*navigation*/}
      <button style={{
        height: 50
      }} onClick={() => {
        // @ts-ignore
        window["IndexTask"]["navToPage"]("LOGIN");
      }}>window.IndexTask.navToPage("LOGIN")</button>

      {/*navigation*/}
      <button style={{
        height: 50
      }} onClick={() => {
        // @ts-ignore
        window["IndexTask"]["navToPage"]("AUTH");
      }}>window.IndexTask.navToPage("AUTH")</button>

      {/*uploadKycBackgroundData*/}
      <button style={{
        height: 50
      }} onClick={() => {
        // @ts-ignore
        window["IndexTask"]["uploadKycBackgroundData"]()
      }}>window.IndexTask.uploadKycBackgroundData()</button>


      {/*callback upload kyc*/}
      {/*[webView].loadUrl("javascript:onUploadKycBackgroundData(Boolean)")*/}

    </div>
  )
}
