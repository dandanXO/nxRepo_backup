export const protoDecode = (t: number, n: Uint8Array) => {
  // console.log(`[websocket] protoDecode case ${t}`)
  // console.log(`[websocket] protoDecode data ${n}`)

  switch (t) {
    case 101:
      return window.protobuf.base.PlayerLoginReply.decode(n);
    case 104:
      return window.protobuf.base.PlayerBalanceEvent.decode(n);
    case 6:
      return window.protobuf.base.SendCommand.decode(n);
      break
    case 209:
      return window.protobuf.base.GlobalNotice.decode(n);
  }
  return null;
}
