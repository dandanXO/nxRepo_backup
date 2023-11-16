import { DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { GetUserGameRecordResponse, useGetUserGameRecordMutation } from "../../../external";
import { AppLocalStorage } from '../../../persistant/localstorage';
import { SectionContainer } from '../../components/container/SectionContainer';
import {useAllowLoginRouterRules} from "../../router/useAllowLoginRouterRules";
import { environment } from "../../../../environments/environment"
import {BackNavigation} from "../../components/BackNavigation/BackNavigation";
import {usePageNavigate} from "../../hooks/usePageNavigate";
import useBreakpoint from "../../hooks/useBreakpoint";
import { Table } from "../../components/Table";
import { undefined } from "zod";


const { RangePicker } = DatePicker;

export const GameRecordPage = () => {
  useAllowLoginRouterRules();

  const pageSize = 10
  const min = moment().subtract(7, 'days');
  const max = moment();
  const dateFormat = 'YYYYMMDD';
  const [dates, setDates] = useState([min, max]);

  const datePickerStyle = {
    backgroundColor: 'var(--table-main)',
    borderRadius: '10px',
    border: 'none',
    color: '#ffffff',
  };

  const [triggerGetRecord, { data }] = useGetUserGameRecordMutation({});
  const [records, setRecords] = useState<GetUserGameRecordResponse["rows"]>([])
  const [page, setPage] = useState(1)

  const {
    onClickToIndex,
  } = usePageNavigate();

  const { isMobile } = useBreakpoint();

  const columns = [
    {
      title: 'Nome do jogo',
      name: 'gameName',
      key: 'gameName',
      render: (record: any) => (
        <div>
          {!isMobile && (
            <img
              alt='gameLogo'
              className='mx-auto w-12 object-cover'
              src={`${environment.s3URLImages}/${record.gameId}.jpg`}
            />)
          }
          <div>
            {record.gameName}
          </div>
        </div>
      )
    },
    { title: 'Tempo',
      name: 'createTime',
      key: 'createTime',
      render: (record: any) => (
        <>
          <div>{record.createTime.split(" ")[0]}</div>
          <div>{record.createTime.split(" ")[1]}</div>
        </>
      )
    },
    { title: 'Valor Da Aposta', name: 'bet', key: 'bet', render:(record: any) => (record.bet / 100).toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}) },
    { title: 'Lucro', name: 'win', key: 'win', render:(record: any) => (record.win / 100).toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}) }
  ]

  const handleFetchData = () => {
    if(records.length < (data?.total || 0)) {
      setPage((records.length / pageSize) + 1)
    }
  }


  useEffect(() => {
    triggerGetRecord({
      dayMin: dates[0].format(dateFormat),
      dayMax: dates[1].format(dateFormat),
      pageNum: page,
      pageSize: pageSize,
      token: AppLocalStorage.getItem('token') || '',
    });
  }, [dates, page]);

  useEffect(()=> {
    setRecords([...records, ...(data?.rows || [])])
  }, [data?.rows])




  return (
    <>
      <div className={'flex h-full flex-col p-4 md:p-8'}>
        <SectionContainer
          className="flex h-full flex-col"
          id={'game-record-section'}
        >
          <BackNavigation onClick={() => onClickToIndex()}/>

          <section className={'mb-4 text-left text-white'}>
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
            />
          </section>

          <div className='h-[80vh] rounded-lg overflow-hidden'>
            <Table
              fetchData={handleFetchData}
              dataSource={records}
              columns={columns}
              dataCount={data?.total || 0}
            />
          </div>

        </SectionContainer>
      </div>
    </>
  );
};
