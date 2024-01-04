import { environment } from "../../../../../../environments/environment"

export const NoData = () => {
  return (
    <td className='flex flex-col justify-center items-center py-[50px] gap-1'>
      <img className={'h-[100px]'} alt="NoData" src={`assets/${environment.assetPrefix}/noData.png`} />
      <div className='text-lg font-medium'>Nada aqui</div>
    </td>
  )
}
