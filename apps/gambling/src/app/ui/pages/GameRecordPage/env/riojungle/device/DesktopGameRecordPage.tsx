import { DatePicker } from 'antd';
import { IGameRecordPageProps } from "../../../index";
import { BackNavigation } from "../../../../../components/BackNavigation/BackNavigation";
import { usePageNavigate } from "../../../../../hooks/usePageNavigate";
import moment, { Moment } from "moment";
import { Table } from "../../../../../components/Table";
import { environment } from "../../../../../../../environments/environment";
import { formatLocaleMoney } from "../../../../../utils/format";

const { RangePicker } = DatePicker;

const datePickerStyle = {
  padding: '6px 25px',
  width: '300px',
  color: 'white',
  backgroundColor: '#333333',
  border: 'none',
  borderRadius: '100px',
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
};

export const DesktopGameRecordPage = ({
  dates,
  setDates,
  records,
  dataCount,
  handleFetchData,
}: IGameRecordPageProps) => {

  const max = moment();

  const { onClickToIndex } = usePageNavigate();

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
          <div>{moment(record.createTime.split(" ")[0]).format('DD.MM.YYYY')}</div>
          <div>{record.createTime.split(" ")[1]}</div>
        </>
      )
    },
    { title: 'Valor Da Aposta', name: 'bet', key: 'bet', render: (record: any) => formatLocaleMoney(record.bet / 100) },
    { title: 'Lucro', name: 'win', key: 'win', render: (record: any) => formatLocaleMoney(record.win / 100) }
  ]

  return (
    <div className='w-full flex justify-center'>
      <div className='w-full px-8 lg:px-0 lg:w-[70%]'>
        <BackNavigation onClick={onClickToIndex} />
        <div className='flex justify-end mb-5 lg:mb-8'>
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
        </div>

        <div className='riojungle777bet-table overflow-x-auto text-white text-center rounded-xl p-5 bg-[#333] mb-5'>
          <Table
            containerClassName={`min-w-[500px] max-h-[652px]`}
            className={'w-full overflow-x-auto !bg-[#333] border-r-0 '}
            titleStyle={`text-[#B3B3B3] font-normal text-xs lg:text-sm`}
            contentStyle={`border-b text-sm`}
            dataSource={records}
            columns={columns}
            dataCount={dataCount}
            fetchData={handleFetchData}
          />
        </div>

      </div>
    </div>
  )
}
