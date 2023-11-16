export const onProtoMessage = (
  {
    t: {data, protoid},
    getUserStore,
    updateUserStore,
    $local,
    toast$1,
  }:
  {
    t: {protoid? : any; data?: any;}
    getUserStore: any; updateUserStore: any;
    $local: any,
    toast$1: any,
  }
  ) => {
  let n = data;
  let o = 0;
  let s = 0;
  let r = {
    type1: 0,
    type2: 0,
    type3: 0,
  };

  console.log("[websocket][onProtoMessage]");
  console.log("[websocket]protoid", protoid);
  console.log("[websocket]data", data);

  switch (protoid) {
    case 4:
      break;
    case 6:
    {
      switch (n && n.type) {
        case 206:
        {
          updateUserStore({
            ...getUserStore(),
            rechargeInfo: JSON.parse(n.param),
            rechargeSuccessDialog: true,
          })
        }
          break;
        case 207:
        {
          let a = JSON.parse(n.param);
          if (a.type == null) {
            updateUserStore({
              ...getUserStore(),
              messageInfo: JSON.parse(n.param),
              messageDialog: !!getUserStore().popCount,
            })

          }
          if (a.type == 302) {
            updateUserStore({
              ...getUserStore(),
              withdrawInfo: JSON.parse(n.param),
              widthdrawSuccessDialog: true,
            })
          }
        }
          break;
        case 301:
        {
          let l = JSON.parse(n.param);
          let i = $local.get("signInLocal") as any;

          if (i) {
            l.upLevelList.map((u: any) => {
              // userStore$3.userinfo.vip_level = u.level;
              i.data.vipLevel = u.level;
              // $local.set("signInLocal", i)
            })

            // userStore$3.popCount)
            $local.remove("vipUpgrade");

            updateUserStore({
              ...getUserStore(),
              isUpgrade: true,
              vipUpgrade: {
                show: true,
                userinfo: {
                  ...getUserStore().userinfo,
                  // vip_level =
                },
                totalReward: Number(l.bonus) + Number(l.cashback),
                upLevelList: l.upLevelList,
              }
            })

            // userStore$3.isUpgrade = true;
            // userStore$3.vipUpgrade = {
            //   show: true,
            //   totalReward: Number(l.bonus) + Number(l.cashback),
            //   upLevelList: l.upLevelList,
            // };


          } else {
            toast$1.success(`Parabéns, você realizou com sucesso para vip ${getUserStore().userinfo.vip_level} e a recompensa de atualização foi emitida para sua conta`, {
              timeout: 4000,
            });

            let u = $local.get("vipUpgrade") as unknown as
              {
                cashback: number;
                bonus: number;
                upLevelList: any;
              } || {
              cashback: 0,
              bonus: 0,
              upLevelList: [],
            }
            if (u) {
              Object.keys(l).map((c: any) => {
                switch (console.log(c), c) {
                  case "cashback":
                    u.cashback += l[c];
                    break;
                  case "bonus":
                    u.bonus += l[c];
                    break;
                  case "upLevelList":
                    l[c].map((d: any) => {
                      u.upLevelList.push(d);
                    });
                    break;
                }
              });
            } else {
              u = l;
            }
            $local.set("vipUpgrade", String(u));
          }
        }
          break;
      }
    }
      break;
    case 101:
      o = 0;
      s = 0;
      r = {
        type1: 0,
        type2: 0,
        type3: 0,
      };

      r = {
        type1: parseFloat((data?.balances[0]?.amount/100).toFixed(2)),
        type2: parseFloat((data?.balances[1]?.amount/100).toFixed(2)),
        type3: parseFloat((data?.balances[2]?.amount/100).toFixed(2)),
      }
      s=r.type2 + r.type3;
      o = (data?.balances[0]?.amount + data?.balances[1]?.amount + data?.balances[3]?.amount)
      $local.set("amount", String(o / 100));

      updateUserStore({
        ...getUserStore(),
        balances: r,
        userAmount: r.type1,
        user: {
          ...getUserStore().user,
          withdrawAmount: s / 100
        }
      })

      break;
    case 104:
      o = 0;
      s = 0;
      r = {
        type1: 0,
        type2: 0,
        type3: 0,
      };
      n.balances.forEach((a: any) => {
        const casecase1 = a.amount && (o += a.amount);
        const casecase2 = (a.type == 2 || a.type == 3) && (s += a.amount);

        switch (a.amount) {
          case casecase1:
          case casecase2:
          case a.type:
          case 1:
            r.type1 = parseFloat((a.amount / 100).toFixed(2));
            break;
          case 2:
            r.type2 = parseFloat((a.amount / 100).toFixed(2));
            break;
          case 3:
            r.type3 = parseFloat((a.amount / 100).toFixed(2));
            break;
        }
      });
      // userStore$3.balances = r;
      // userStore$3.setUserAmount(parseFloat((o / 100).toFixed(2)));
      // userStore$3.userAmount = parseFloat((o / 100).toFixed(2));

      $local.set("amount", String(o / 100));
      // userStore$3.user.withdrawAmount = parseFloat((s / 100).toFixed(2));

      // console.log("[websocket][104] userStore$3", userStore$3);

      updateUserStore({
        ...getUserStore(),
        balances: r,
        userAmount: parseFloat((o / 100).toFixed(2)),
        user: {
          ...getUserStore().user,
          withdrawAmount: parseFloat((s / 100).toFixed(2)),
        }
      })

      break;
  }
}
