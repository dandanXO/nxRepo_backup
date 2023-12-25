import { environment } from "apps/gambling/src/environments/environment"

export const NoData = () => {
  return (
    <div className="mt-0 md:mt-2 lg:mt-3 py-9 lg:py-11 border-dashed border-[#b3b3b3] flex flex-col justify-center w-full items-center border-2 rounded-lg">
      <img className={'h-[64px] md:h-[104px] lg:h-[120px] mb-2'} alt="NoData" src={`assets/${environment.assetPrefix}/noData.png`} />
      <div className='text-sm md:text-base lg:text-xl font-normal text-[#B3B3B3]'>Nada aqui</div>
    </div>
  )
}