export const onMessageError = ({n, close, getUserStore, updateUserStore}: {
                                 n: any, close: any, getUserStore: any, updateUserStore: any
                               }) => {
  if(!n || !n.errcode) return;
  switch (n.errcode) {
    case 102:
      close();
      // console.log("fdsfjiodasjfiodjsaiofjdsiojfiods")
      // userStore$3.user.token = "";

      updateUserStore({
        ...getUserStore(),
        user: {
          ...getUserStore().user,
        }
      })
      // $local.remove("token");
      // router.push("/");
      // $local.remove("vipUpgrade");
      // $local.remove("setGetLocal");
      // $local.remove("gameLabelLocal");
      // $local.remove("getBoxInfoLocal");
      // $local.remove("signInLocal");
      // $local.remove("getVipAllLocal");
      // $local.remove("getInviteConfigLocal");
      // $local.remove("mailCountLocal");
      // $local.remove("gameRecenteLocal");
      // $local.remove("gameListLocal");
      return;
  }
}
