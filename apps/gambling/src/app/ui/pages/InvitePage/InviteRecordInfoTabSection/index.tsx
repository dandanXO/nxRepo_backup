import {useEffect, useState} from "react";
import useBreakpoint from "../../../hooks/useBreakpoint";
import {
  GetInviteRewardDataResponse,
  GetUnsettleInviteRewardDataResponse,
  useLazyGetInviteUserDayReportDataQuery
} from "../../../../external/index";
import moment from "moment";

import {AppLocalStorage} from "../../../../persistant/localstorage";
import {MobilePanel} from "./MobilePanel";
import {DesktopPanel} from "./DesktopPanel";
import {AppLocalStorageKey} from "../../../../persistant/AppLocalStorageKey";


export interface ITabType {
  type: "1" | "2" | "3";
  onClick: (mode: string) => void
}

export interface IBoardData {
  data: {
    // 所有邀請獎勵
    totalReward: string;
    // 已結算邀請獎勵
    paidReward: string;
    // 未結算邀請獎勵
    waitForCalReward: string
  }
}

interface IInviteRecordInfoTabSection {
    inviteInfo: GetInviteRewardDataResponse;
    inviteUnsettle: GetUnsettleInviteRewardDataResponse;
}

export const InviteRecordInfoTabSection = (props: IInviteRecordInfoTabSection) => {
    const {isMobile} = useBreakpoint();

    const [totalPanelMode, setTotalPanelMode] = useState<"1" | "2" | "3">("1");
    const [dailyPanelMode, setDailyPanelMode] = useState<"1" | "2" | "3">("1");
    const [mobileTotalPanelMode, setMobileTotalPanelMode] = useState<"1" | "2" | "3">("1");
    const [mobileDailyPanelMode, setMobileDailyPanelMode] = useState<"1" | "2" | "3">("1");
    const [orangeRecordSelectedDate, setOrangeRecordSelectedDate] = useState(moment())

    const inviteInfoData = props?.inviteInfo?.data;
    const inviteUnsettleData = props?.inviteUnsettle?.data;

    // 1 代理 0 全民
    const isProxy = props?.inviteInfo?.data.proxyType === 1
    const convertRecharge = (num1: number | string, num2: number | string) => {
        return ((Number(num1) + Number(num2)) / 100).toFixed(2)
    }

    const [triggerGetInviteUserDay, { currentData: inviteUserDay, isFetching: isInviteUserDayeFetching }] =
      useLazyGetInviteUserDayReportDataQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false,
      });

    const reload = () => {
      triggerGetInviteUserDay({
        pageNum: "1",
        pageSize: "1000",
        token: AppLocalStorage.getItem(AppLocalStorageKey.token) || '',
        userId: String(inviteInfoData.userId|| inviteUnsettleData.userId),
        // dayMin: isMobile ? moment().format('YYYYMMDD') : moment().subtract(1, 'days').format('YYYYMMDD'),
        dayMin: isMobile ? orangeRecordSelectedDate.format('YYYYMMDD'): moment().subtract(1, 'days').format('YYYYMMDD'),
        dayMax: isMobile ? orangeRecordSelectedDate.format('YYYYMMDD'): moment().format('YYYYMMDD')
      })
    }
    useEffect(() => {
      if (inviteInfoData.userId || inviteUnsettleData.userId) {
        reload();
      }
    }, [orangeRecordSelectedDate])

    // NOTE: window focus change
    useEffect(() => {
      const handler = () => {
        reload();
      }
      window.addEventListener("focus", handler)
      return () => {
        window.removeEventListener("focus", handler)
      }
    }, [])

    const x = inviteInfoData;
    const y = inviteUnsettleData;

    const totalRewardData = {
        // 历史总佣金 + 待领取佣金
        // x.reward + y.firstRechargeReward + y.flow1Reward + y.rewd1Reward + y.flow2Reward + y.rewd2Reward + y.flow3Reward + y.rewd3Reward
        totalReward: ((Number(x.reward) + Number(y.firstRechargeReward) + Number(y.flow1Reward) + Number(y.rewd1Reward) + Number(y.flow2Reward) + Number(y.rewd2Reward) + Number(y.flow3Reward) + Number(y.rewd3Reward))/100).toFixed(2),
        // 历史总佣金
        // x.reward
        paidReward: (Number(x.reward) / 100).toFixed(2),
        // 待领取佣金
        // y.firstRechargeReward + y.flow1Reward + y.rewd1Reward + y.flow2Reward + y.rewd2Reward + y.flow3Reward + y.rewd3Reward
        waitForCalReward: ((Number(y.firstRechargeReward) + Number(y.flow1Reward) + Number(y.rewd1Reward) + Number(y.flow2Reward) + Number(y.rewd2Reward) + Number(y.flow3Reward) + Number(y.rewd3Reward))/100).toFixed(2)
    }

    const totalInviteData = {
      '1': {
        // Dividends （仅限代理显示） 后台未显示
        // x.rewd1Reward
        dividendos: (x.rewd1Reward / 100).toFixed(2),

        // 首充奖励 + 流水奖励
        // x.firstRechargeReward + y.firstRechargeReward + x.flow1Reward + y.flow1Reward
        totalReward: ((
          Number(x.firstRechargeReward) + Number(y.firstRechargeReward) +
          Number(x.flow1Reward) + Number(y.flow1Reward)
        ) / 100).toFixed(2),

        // 直推充值人数
        // x.num1Recharge
        numRecharge: x.num1Recharge,

        // 直推首充奖励 + 直推首充待结算奖励
        // x.firstRechargeReward + y.firstRechargeReward
        firstRecharge: ((Number(x.firstRechargeReward) + Number(y.firstRechargeReward))/100).toFixed(2),

        // 直推流水 + 直推待结算流水
        // x.flow1 + y.flow1
        gameRecharge: ((Number(x.flow1) + Number(y.flow1))/100).toFixed(2),

        // 直推流水奖励 + 直推待结算流水奖励
        // x.flow1Reward + y.flow1Reward
        gameRechargeReward: ((Number(x.flow1Reward) + Number(y.flow1Reward))/100).toFixed(2),

      },
      '2': {
        // Dividends （仅限代理显示） 后台未显示
        // x.rewd2Reward
        dividendos: (x.rewd2Reward / 100).toFixed(2),

        // 二级流水返利 + 二级待结算流水奖励
        // x.flow2Reward + y.flow2Reward
        totalReward: ((Number(x.flow2Reward) + Number(y.flow2Reward))/100).toFixed(2),

        // NOTICE: 2級沒有使用這欄位
        numRecharge: 0,

        // 二级流水 + 二级待结算流水
        // x.flow2 + y.flow2
        gameRecharge: ((Number(x.flow2) + Number(y.flow2))/100).toFixed(2),

        // 二级流水返利 + 二级待结算流水奖励
        // x.flow2Reward + y.flow2Reward
        gameRechargeReward: ((Number(x.flow2Reward) + Number(y.flow2Reward))/100).toFixed(2),

      },
      '3': {
        // Dividends （仅限代理显示） 后台未显示
        // x.rewd3Reward
        dividendos: (x.rewd3Reward / 100).toFixed(2),

        // 三级流水返利 + 三级待结算流水奖励
        // x.flow3Reward + y.flow3Reward
        totalReward: ((Number(x.flow3Reward) + Number(y.flow3Reward))/100).toFixed(2),

        // NOTICE: 3級沒有使用這欄位
        numRecharge: 0,

        // 三级流水 + 三级待结算流水
        // x.flow3 + y.flow3
        gameRecharge: ((Number(x.flow3) + Number(y.flow3))/100).toFixed(2),

        // 三级流水返利 + 三级待结算流水奖励
        // x.flow3Reward + y.flow3Reward
        gameRechargeReward: ((Number(x.flow3Reward) + Number(y.flow3Reward))/100).toFixed(2),
      }
    }[isMobile ? mobileTotalPanelMode : totalPanelMode]


    const dailyData = inviteUserDay?.data?.records.map((z: any) => {
        const dataType = isMobile ? mobileDailyPanelMode : dailyPanelMode
        // console.log("dailyData0", dataType);

        const dividendos = (() => {
          if(dataType === "1") {
            // z.rewd1Reward
            return z.rewd1Reward;
          } else if (dataType === "2") {
            // z.rewd2Reward
            return z.rewd2Reward
          } else {
            // z.rewd3Reward
            return z.rewd3Reward
          }
        })()
        // console.log("dailyData1", dailyData);

        // 當天總邀請獎勵
        const totalReward = (() => {
          if(dataType === "1") {
            // z.firstRechargeReward + z.flow1Reward
            return ((z.firstRechargeReward + z.flow1Reward) / 100).toFixed(2)
          } else if (dataType === "2") {
            // z.flow2Reward
            return (z.flow2Reward / 100).toFixed(2)
          } else {
            // z.flow3Reward
            return (z.flow3Reward / 100).toFixed(2);
          }
        })()
        // console.log("dailyData2", totalReward);

        // 當天有充值過的邀請人數
        // NOTICE: 2.3 級沒有這數據
        // z.num1Recharge
        const numRecharge = dataType === "1" ? z.num1Recharge : 0;

        // console.log("dailyData3", numRecharge);
        // 當天有產生首充邀請獎勵
        // NOTICE: 2.3 級沒有這數據
        // z.firstRechargeReward
        const firstRecharge = dataType === "1" ? Number(z.firstRechargeReward / 100).toFixed(2) : 0;
        // console.log("dailyData4", firstRecharge);

        // 當天邀請玩家的總流水
        const gameRecharge = (() => {
          if(dataType === "1") {
            // z.flow1
            return (z.flow1 / 100).toFixed(2)
          } else if (dataType === "2") {
            // z.flow2
            return (z.flow2 / 100).toFixed(2)
          } else {
            // z.flow3
            return (z.flow3 / 100).toFixed(2)
          }
        })()
        // console.log("dailyData5", gameRecharge);
        // 當天邀請玩家的總流水獎金
        const gameRechargeReward = (() => {
          if(dataType === "1") {
            // z.flow1Reward
            return (z.flow1Reward / 100).toFixed(2)
          } else if (dataType === "2") {
            // z.flow2Reward
            return (z.flow2Reward / 100).toFixed(2)
          } else {
            // z.flow3Reward
            return (z.flow3Reward / 100).toFixed(2)
          }
        })()
        // console.log("dailyData6", gameRechargeReward);
        return { numRecharge, firstRecharge, gameRecharge, gameRechargeReward, totalReward, dividendos }
    })
    // console.log("dailyData", dailyData);

  return (
    <div className={"mb-[80px]"}>
      {isMobile ? (
        <MobilePanel isProxy={isProxy} totalRewardData={totalRewardData} totalInviteData={totalInviteData} mobileTotalPanelMode={mobileTotalPanelMode} setMobileTotalPanelMode={setMobileTotalPanelMode} dailyData={dailyData} mobileDailyPanelMode={mobileDailyPanelMode} setMobileDailyPanelMode={setMobileDailyPanelMode} orangeRecordDate={orangeRecordSelectedDate.format('YYYY-MM-DD')} onOrangeRecordDateSelect={(date)=> setOrangeRecordSelectedDate(moment(date, 'YYYY-MM-DD'))}/>
      ) : (
        <DesktopPanel isProxy={isProxy} totalRewardData={totalRewardData} totalInviteData={totalInviteData} totalPanelMode={totalPanelMode} setTotalPanelMode={setTotalPanelMode} dailyData={dailyData} dailyPanelMode={dailyPanelMode} setDailyPanelMode={setDailyPanelMode}/>
      )}
    </div>
  )
}
