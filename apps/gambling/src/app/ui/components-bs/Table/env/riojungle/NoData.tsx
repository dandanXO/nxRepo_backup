import { environment } from "../../../../../../environments/environment"

export const NoData = (props: any) => {
  return (
    <div className={"p-2 "+props.className}>
      <div className={"h-full mt-0 md:pt-2 lg:pt-3 py-9 lg:py-11 border-dashed border-[var(--grayscale-70)] flex flex-col justify-center w-full items-center border-2 rounded-lg "+props.className}>
        <img className={'h-[64px] md:h-[104px] lg:h-[120px] mb-2'} alt="NoData" src={`assets/${environment.uVersion}/noData.png`} />
        <div className='text-sm md:text-base lg:text-xl font-normal text-[var(--grayscale-70)]'>Nada aqui</div>
      </div>
    </div>
  )
}
