import { tcx } from "../../../../../../utils/tcx";
import GiftIcon from '../../images/Gift.png'
import StarIcon from '../../images/Star.png'
import TrendUpIcon from '../../images/TrendUp.png'
import MoneyIcon from '../../images/Money.png'
import useBreakpoint from "../../../../../../pageTemplate/hooks/useBreakpoint";
import React, { useState } from "react";
import { GetSignInConfigResponse, GetUserVIPAllInfoResponse } from "../../../../../../../external";
import { formatLocaleMoney } from "../../../../../../utils/format";


const jackpotMap: { [key: string]: string} = {
  '20': 'Audi A4',
  '21': 'BMW 520I',
  '22': 'Porsche Cayenne',
  '23': 'Porsche 911',
  '24': 'Ferrari 448',
  '25': 'Helicóptero',
}

interface IVIPInfoTabProps {
  signInTotalDays?: number;
  allLevelInfo: GetUserVIPAllInfoResponse['data'];
  allSignInConfig?: GetSignInConfigResponse['data']['signInAllConfig'];
  className?: string;
}

export const VIPInfoTab = ({
  className,
  signInTotalDays,
  allLevelInfo,
  allSignInConfig
}: IVIPInfoTabProps) => {
  const [selected, setSelected] = useState(0)

  const { isMobile } = useBreakpoint();

  const vipInfoTabList: { title: string, icon: string, contentKey: 'signInBonus' | 'upRewardAmout' | 'withdrawAmountLimitDay' | 'withdrawTimesLimitDay' }[] = [
    {
      title: `Recompensa total de check-in de ${signInTotalDays} dias`,
      icon: GiftIcon,
      contentKey: 'signInBonus'
    },
    {
      title: 'Recompensa de atualização',
      icon: StarIcon,
      contentKey: 'upRewardAmout'
    },
    {
      title: 'Limite máximo de retirada única',
      icon: TrendUpIcon,
      contentKey: 'withdrawAmountLimitDay'
    },
    {
      title: 'Número de retiradas por dia',
      icon: MoneyIcon,
      contentKey: 'withdrawTimesLimitDay'
    }
  ]

  const allLevelInfoWithBonus = allLevelInfo.map((info) => {
    const currentLevelSignInConfigData = allSignInConfig?.find((config)=> {
      return config.identifier.split('::')[2].replace('V', '') === `${info.level}`
    })
    const currentLevelSignInConfig = JSON.parse(currentLevelSignInConfigData?.value || '[]');
    const signInBonus = currentLevelSignInConfig?.reduce(
      (acc: number, current: { cashback: number }) => acc + current.cashback,
      0
    );

    return {
      ...info,
      signInBonus: `R$ ${formatLocaleMoney(signInBonus)}`,
      upRewardAmout: info.level < 20 ? `R$ ${formatLocaleMoney(info.upRewardAmout / 100)}`: `Nível Mega Jackpot:${jackpotMap[info.level.toString()]},Ou numerário de valor equivalente`,
      withdrawAmountLimitDay: `R$ ${formatLocaleMoney(info.withdrawAmountLimitDay /100)}`
    }
  })

  return (
    <div className={tcx('w-full', className)}>
      {/*TAB Selector*/}
      <div className='flex w-full h-14 sm:h-[124px] lg:h-[146px]'>
        {
          vipInfoTabList.map((item, index) => (
            <div
              key={index}
              className={tcx('h-full w-1/4 flex flex-col items-center justify-center sm:px-3 lg:px-[50px]', ['bg-[var(--secondary-main)] rounded-t-2xl', index === selected])}
              onClick={() => setSelected(index)}
            >
              <img alt={`icon${item.title}`} src={item.icon} className={tcx('w-8 h-8 sm:w-12 sm:h-12', ['brightness-[0.7]', index !== selected])} />
              {
                !isMobile && <div className={tcx('text-sm lg:text-base font-medium text-[var(--grayscale-70)] text-center', ['text-white', index ===selected])}>{item.title}</div>
              }
            </div>
          ))
        }
      </div>
      <div className='h-1 w-full bg-[var(--secondary-main)]' />
      <div className={tcx('w-full bg-[var(--grayscale-20)] rounded-b-2xl mb-[66px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-2 sm:gap-5 sm:p-5')}>
        {
          isMobile && <div className='text-sm text-white text-center font-medium'>{vipInfoTabList[selected].title}</div>
        }
        {
          allLevelInfoWithBonus.map((info) => {
            const isJackPot = (info.level >= 20) && selected === 1

            let jackPot = ['', '']
            if (isJackPot) {
              jackPot = info.upRewardAmout.split(',')
            }

            return (
              <div key={info.level} className={tcx('text-white flex w-full bg-[var(--grayscale-30)] rounded-full', ['bg-[var(--grayscale-40)]', isJackPot])}>
                <div className={tcx('text-sm lg:text-lg font-bold flex-shrink-0 bg-[var(--primary-main)] rounded-full w-20 lg:w-[100px] flex items-center justify-center py-[10px] px-4 lg:px-[22px] shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)]', ['bg-[var(--state-warn-main)]', isJackPot])}>VIP {info.level}</div>
                <div className={tcx('text-sm lg:text-base font-medium w-full flex justify-center items-center text-center overflow-ellipsis', ['text-xs lg:text-xs', isJackPot])}>
                  {
                    !isJackPot && info[vipInfoTabList[selected].contentKey]
                  }
                  {
                    isJackPot && (
                      <div>
                        <div>{jackPot[0]}</div>
                        <div>{jackPot[1]}</div>
                      </div>
                    )
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
