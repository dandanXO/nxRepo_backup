import { tcx } from "../../../../../../utils/tcx";
import LockOpen from '../../images/LockOpen.png'
import Lock from '../../images/Lock.png'


const vips: number[] = [];

for (let i = 0; i <= 25; i += 1) {
  vips.push(i);
}

const shadowClassName = 'shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)]'

interface IVerticalVIPButtonListProps {
  selectedVIP: number
  currentVIP: number
  onSelect: (vip: number) => void
}

export const VerticalVIPButtonList = ({
  selectedVIP,
  currentVIP,
  onSelect
}: IVerticalVIPButtonListProps) => {
  return vips.map((vip) => {

    const backgroundColor = (currentVIP === 25 ? currentVIP: currentVIP + 1) === vip ? 'bg-[#10B98F]': vip > currentVIP ? 'bg-[#666666]' : 'bg-[var(--primary-main)]';

    return (
      <div
        key={vip}
        className={tcx(
          backgroundColor,
          shadowClassName,
          'w-[60%] text-white rounded-full text-center flex justify-center items-center gap-1 py-1 text-sm font-bold',
          ['w-full text-base', vip === selectedVIP])
        }
        onClick={()=>onSelect(vip)}
      >
        {vip === (currentVIP === 25 ? currentVIP: currentVIP + 1) && <img alt='lockOpen' src={LockOpen} className='w-4 h-4' />}
        {vip > (currentVIP === 25 ? currentVIP: currentVIP + 1) && <img alt='lockOpen' src={Lock} className='w-4 h-4' />}
        <div>VIP{vip}</div>
      </div>
    )
  })
}
