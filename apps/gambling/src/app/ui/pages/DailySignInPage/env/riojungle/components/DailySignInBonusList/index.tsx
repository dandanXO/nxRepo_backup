import { GetSignInConfigResponse } from "../../../../../../../external";
import { tcx } from "../../../../../../utils/tcx";
import Money from '../../images/Money.png';
import DisableMoney from '../../images/DisableMoney.png';
import { formatLocaleMoney } from "../../../../../../utils/format";


interface IDailySignInBonusListProps {
  currentVIP: number
  selectedVIP: number
  signInTotalDays: GetSignInConfigResponse['data']['signInTotalDays'];
  className?: string
  dayConfigs: { days: number, cashback: number}[]
}

export const  DailySignInBonusList = ({
  selectedVIP,
  signInTotalDays,
  currentVIP,
  className,
  dayConfigs
}: IDailySignInBonusListProps) => {

  return (
    <div className={tcx('w-full', className)}>
      {
        dayConfigs.map(
          (config, index: number) => {

            const checked = currentVIP === selectedVIP && index + 1 <= signInTotalDays || selectedVIP < currentVIP

            return (
              <div
                key={config.days}
                className={tcx(
                  'w-full rounded-lg flex flex-col gap-1 sm:gap-3 justify-center items-center h-[140px] sm:h-[180px] lg:h-[308px] bg-gradient-to-br from-[var(--liner-main-from)] to-[var(--liner-main-to)]',
                  ['from-[var(--grayscale-20)] to-[var(--grayscale-20)]', checked]
                )}
              >
                <img alt='money' className='h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20' src={checked?DisableMoney:Money} />
                <div className={tcx('text-white font-bold text-base sm:text-xl lg:text-3xl text-center', ['text-[var(--grayscale-40)]', checked])}>R$ {formatLocaleMoney(config.cashback)}</div>
                <div className={tcx('text-white font-bold text-base sm:text-lg lg:text-2xl', ['text-[#999999]', checked])}>Dia {config.days}</div>
              </div>
            )
          }
        )
      }
    </div>
  )
}
