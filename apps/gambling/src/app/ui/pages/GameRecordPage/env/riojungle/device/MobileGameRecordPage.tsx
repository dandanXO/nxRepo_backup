import { IGameRecordPageProps } from "../../../index";
import { BackNavigation } from "../../../../../components/BackNavigation/BackNavigation";
import { usePageNavigate } from "../../../../../hooks/usePageNavigate";
import RangeDatePicker from "../../../../../components/DatePickers/RangeDatePicker";
import moment from "moment";
import { formatLocaleMoney } from "../../../../../utils/format";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const BottomLine = styled.div`
 height: 1px;
 background: linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.20) 49.48%, rgba(255, 255, 255, 0.00) 100%);
`


export const MobileGameRecordPage = ({
  dates,
  setDates,
  records,
  handleFetchData,
  dataCount
}: IGameRecordPageProps) => {

  const wrapperRef = useRef<HTMLDivElement>(null)

  const max = moment();

  const { onClickToIndex } = usePageNavigate();

  const handleOnScroll = (e: any) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;

    if (bottom <= 30 && handleFetchData !== undefined) {
      handleFetchData()
    }
  }

  useEffect(() => {
    if (wrapperRef?.current?.scrollHeight !== undefined) {
      const scrollbarVisible = wrapperRef?.current?.scrollHeight > wrapperRef?.current?.clientHeight;

      // 如果滾軸沒有出現，判斷是否還有資料
      if (!scrollbarVisible &&
        handleFetchData !== undefined &&
        (Number(dataCount) - Number(records.length) > 0)
      ) {
        handleFetchData();
      }
    }
  }, [records])

  return (
    <div className='fixed flex flex-col w-full h-[calc(100vh-52.5px)] px-4'>
      <BackNavigation onClick={onClickToIndex} />

      <RangeDatePicker
        min='2023-01-01'
        max={max.format('YYYY-MM-DD')}
        onConfirm={(values) => setDates([moment(values[0], 'YYYY-MM-DD'), moment(values[1], 'YYYY-MM-DD')])}
        value={[dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD')]}
      />

      <div
        ref={wrapperRef}
        className='grow mb-5 mt-3 rounded-lg w-full bg-[#333333] p-2 overflow-y-scroll'
        onScroll={handleOnScroll}
      >
        {
          records.map((record) => (
            <div
              key={record.roomId}
              className='bg-[#262626] w-full rounded-lg p-2 text-sm text-[#B3B3B3] mb-[10px] border border-[#4D4D4D]'
            >
              <div className='w-full flex justify-between pb-2'>
                <div>Nome Do Jogo</div>
                <div>{record.gameName}</div>
              </div>
              <BottomLine />
              <div className='w-full flex justify-between py-2'>
                <div>Tempo</div>
                <div>{moment(record.createTime).format('DD.MM.YYYY HH:mm:ss')}</div>
              </div>
              <BottomLine />
              <div className='w-full flex justify-between py-2'>
                <div>Valor Da Aposta</div>
                <div>R$ {formatLocaleMoney(record.bet / 100)}</div>
              </div>
              <BottomLine />
              <div className='w-full flex justify-between pt-2'>
                <div>Lucro</div>
                <div>R$ {formatLocaleMoney(record.win / 100)}</div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
