import { IGameRecordPageProps } from "../../../index";
import { BackNavigation } from "../../../../../components/BackNavigation/BackNavigation";
import { usePageNavigate } from "../../../../../hooks/usePageNavigate";
import RangeDatePicker from "../../../../../components/DatePickers/RangeDatePicker";
import moment from "moment";


export const MobileGameRecordPage = ({
  dates,
  setDates
}: IGameRecordPageProps) => {

  const max = moment();

  const { onClickToIndex } = usePageNavigate();

  return (
    <div className='fixed w-full h-[calc(100vh-52.5px)] px-4'>
      <BackNavigation onClick={onClickToIndex} />

      <RangeDatePicker
        min='2023-01-01'
        max={max.format('YYYY-MM-DD')}
        onConfirm={(values) => setDates([moment(values[0], 'YYYY-MM-DD'), moment(values[1], 'YYYY-MM-DD')])}
        value={[dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD')]}
      />
    </div>
  )
}
