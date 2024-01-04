import { DatePicker } from 'antd';
import useBreakpoint from "../../../../hooks/useBreakpoint";
import { BackNavigation } from "../../../../components-bs/BackNavigation/BackNavigation";
import { tcx } from "../../../../utils/tcx";
import { usePageNavigate } from "../../../../hooks/usePageNavigate";
import RangeDatePicker from "../../../../components-bs/DatePickers/RangeDatePicker";
import { Dispatch, SetStateAction } from "react";
import moment from "moment";
import { Moment } from "moment/moment";
import { datePickerStyle } from "../../../../components-bs/DatePickers/DatePicker";
import { Table } from "../../../../components-bs/Table";
import { GetUserGameRecordResponse } from "../../../../../external";
import { environment } from "../../../../../../environments/environment";
import { formatLocaleMoney } from "../../../../utils/format";
import { IGameRecordPageProps } from "../../index";

const { RangePicker } = DatePicker;




export const GameRecordPage = ({
  dates,
  setDates,
  handleFetchData,
  records,
  dataCount
}: IGameRecordPageProps) => {

  const max = moment();

  const { onClickToIndex } = usePageNavigate();

  const { isMobile } = useBreakpoint();

  const columns = [
    {
      title: 'Nome do jogo',
      name: 'gameName',
      key: 'gameName',
      render: (record: any) => (
        <div className='flex flex-col gap-1'>
          <img
            alt='gameLogo'
            className='mx-auto w-12 object-cover'
            src={`${environment.s3URLImages}/${record.gameId}-small.png`}
          />
          <div>
            {record.gameName}
          </div>
        </div>
      )
    },
    {
      title: 'Tempo',
      name: 'createTime',
      key: 'createTime',
      render: (record: any) => (
        <>
          <div>{moment(record.createTime.split(" ")[0]).format('DD.MM-YYYY')}</div>
          <div>{record.createTime.split(" ")[1]}</div>
        </>
      )
    },
    { title: 'Valor Da Aposta', name: 'bet', key: 'bet', render: (record: any) => formatLocaleMoney(record.bet / 100) },
    { title: 'Lucro', name: 'win', key: 'win', render: (record: any) => formatLocaleMoney(record.win / 100) }
  ]

  return (
    <div className='flex h-full flex-col px-4 md:px-8'>
      <div
        className='flex h-full flex-col text-white'
      >
        <BackNavigation
          className={tcx('pl-0 pt-5 pb-6', ['pb-7', isMobile])}
          onClick={() => onClickToIndex()}
          title={isMobile?(<div className='absolute left-0 w-full text-center font-bold text-lg'>Registro do jogo</div>):undefined}
        />

        <section className='mb-4 text-left text-white'>
          {
            isMobile ?
              (
                <RangeDatePicker
                  min='2023-01-01'
                  max={max.format('YYYY-MM-DD')}
                  onConfirm={(values) => setDates([moment(values[0], 'YYYY-MM-DD'), moment(values[1], 'YYYY-MM-DD')])}
                  value={[dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD')]}
                />
              ):
              (
                <RangePicker
                  value={[dates[0], dates[1]]}
                  allowClear={false}
                  format="YYYY-MM-DD"
                  onChange={(dates) => {
                    if (dates) {
                      setDates(dates as Moment[]);
                    }
                  }}
                  style={datePickerStyle}
                  disabledDate={(current) => current > max}
                />
              )
          }
        </section>

        <div className='h-[80vh] rounded-lg overflow-hidden'>
          <Table
            className={tcx('text-base', ['text-xs', isMobile])}
            titleStyle={tcx('text-sm', ['text-xs', isMobile])}
            fetchData={handleFetchData}
            dataSource={records}
            columns={columns}
            dataCount={dataCount}
          />
        </div>

      </div>
    </div>
  )
}
