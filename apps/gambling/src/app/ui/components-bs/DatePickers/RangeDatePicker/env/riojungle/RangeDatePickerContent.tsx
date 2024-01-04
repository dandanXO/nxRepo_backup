import { environment } from "../../../../../../../environments/environment";


export const RangeDatePickerContent = ({
  value
}: { value: [string, string]}) => {
  return (
    <div className='flex items-center gap-2'>
      <img
        alt='calendar'
        className='w-[28px] h-[28px]'
        src={`assets/${environment.assetPrefix}/Calendar.png`}
      />
      {value[0]}
      {' - '}
      {value[1]}
    </div>
  )
}
