import { DatePicker } from 'antd';
import { IGameRecordPageProps } from "../../../index";
import { BackNavigation } from "../../../../../components-bs/BackNavigation/BackNavigation";
import { usePageNavigate } from "../../../../../router/hooks/usePageNavigate";
import moment, { Moment } from "moment";
import { Table } from "../../../../../components-bs/Table";
import { environment } from "../../../../../../../environments/environment";
import { formatLocaleMoney } from "../../../../../utils/format";
import {PageContainer} from "../../../../../components-bs/PageContainer";

const { RangePicker } = DatePicker;

const datePickerStyle = {
  padding: '6px 25px',
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
        <div className='flex gap-2 items-center'>
          <img
            alt='gameLogo'
            className='w-12 object-cover'
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
          <div>{moment(record.createTime).format('DD.MM.YYYY HH:mm:ss')}</div>
        </>
      )
    },
    { title: 'Valor Da Aposta', name: 'bet', key: 'bet', render: (record: any) => `R$ ${formatLocaleMoney(record.bet / 100)}` },
    { title: 'Lucro', name: 'win', key: 'win', render: (record: any) => formatLocaleMoney(record.win / 100) }
  ]

  return (
    <PageContainer>
      <BackNavigation onClick={onClickToIndex} />
      <div className='flex justify-end mb-5 lg:mb-8'>
        <RangePicker
          value={[dates[0], dates[1]]}
          allowClear={false}
          format="YYYY-MM-DD"
          separator={'-'}
          onChange={(dates) => {
            if (dates) {
              setDates(dates as Moment[]);
            }
          }}
          suffixIcon={false}
          className="before:translate-y-0.5 before:content-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAcCAYAAACdz7SqAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAF9SURBVHgB7VbRUcMwDJW5/FM2CBMQJiBMAExQmACYgGOClgnSDWADygZhgmSDphOYp0M5mmDXCnGBj767dzo7sl8sKVaI/iustZOYfpqNrsGV0rcC70J+iWMhv+3lxtQFOGFxCiMFz+DbyLgxxrwEV2FBYePita9hHKIVzDvYhontLXhMYfDaJ3Au4xmY4bSdtYln8QqOtbxECbNsx9vQ98V47fJLQhthgwXMghSA76nGzyfKhZPSeBy6Jn05TSkeam1O30gZ0gCm5DiAT7SSXI4Copa7RA/oDxCsXobcUgW4ebfeIxqlPH+AWWM81+ynEhW0grnYRir8GczAJX1dCluhCi9OwHfouWzMeJQLIKfPnNU0AENzmomdcsi52MCjnYpC4AqGT5xStxMNglqU+yTIJz2RqYZ+iCHVy51mJlOlqk+OEeVCgjCHlU/KL9AXvKHu5zReVIRr8hSMpu1pRHfaZb6Bfy9sXBR9DeMR5s8hzu8k8s81QXv8Fj4Axp4rRafIlxYAAAAASUVORK5CYII=')]"
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
    </PageContainer>
  )
}
