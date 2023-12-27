export const protoEncode = (t: number, n: any) => {
  // console.log(`[websocket] protoEncode case ${t}`)
  // console.log(`[websocket] protoEncode data ${JSON.stringify(n)}`)

  switch (t) {
    case 3:
      return new Uint8Array(0);
    case 100:
      return window.protobuf.base.PlayerLoginReq.encode(
        window.protobuf.base.PlayerLoginReq.create(n)
      ).finish();
  }
}
