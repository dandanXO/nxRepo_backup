import { DownOutlined } from "@ant-design/icons";


export const RangeDatePickerContent = ({
  value
}: { value: [string, string]}) => {
  return (
    <div className='flex items-center gap-[10px]'>
      {value[0]}
      {' - '}
      {value[1]}
      <DownOutlined />
    </div>
  )
}
