import { DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import { useEffect, useState } from 'react';

import { GetUserGameRecordResponse, useGetUserGameRecordMutation } from "../../../external";
import { AppLocalStorage } from '../../../persistant/localstorage';
import { SectionContainer } from '../../components/container/SectionContainer';
import { useAllowLoginRouterRules } from "../../router/useAllowLoginRouterRules";
import { environment } from "../../../../environments/environment"
import { BackNavigation } from "../../components/BackNavigation/BackNavigation";
import { usePageNavigate } from "../../hooks/usePageNavigate";
import useBreakpoint from "../../hooks/useBreakpoint";
import { Table } from "../../components/Table";
import RangeDatePicker from "../../components/DatePickers/RangeDatePicker";
import { AppLocalStorageKey } from "../../../persistant/AppLocalStorageKey";
import { datePickerStyle } from '../../components/DatePickers/DatePicker';
import { formatLocaleMoney } from "../../utils/format";
import { tcx } from "../../utils/tcx";
import { GameRecordPage as CocoGameRecordPage } from './env/coco'
import { renderByPlatform } from "../../utils/renderByPlatform";


const { RangePicker } = DatePicker;

export const GameRecordPage = () => {
  useAllowLoginRouterRules();

  const pageSize = 10
  const startDate = moment().subtract(7, 'days');
  const endDate = moment();
  const max = moment();
  const dateFormat = 'YYYYMMDD';
  const [dates, setDates] = useState([startDate, endDate]);


  const [triggerGetRecord, { data }] = useGetUserGameRecordMutation({});
  const [resetRecords, setResetRecords] = useState(false);
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

  const handleFetchData = () => {
    if (records.length < (data?.total || 0)) {
      setPage((records.length / pageSize) + 1)
    }
  }


  useEffect(() => {
    triggerGetRecord({
      dayMin: dates[0].format(dateFormat),
      dayMax: dates[1].format(dateFormat),
      pageNum: page,
      pageSize: pageSize,
      token: AppLocalStorage.getItem(AppLocalStorageKey.token) || '',
    });
  }, [page, dates]);

  useEffect(() => {
    setResetRecords(true)
    setPage(1)
  }, [dates])


  useEffect(() => {
    if (resetRecords) {
      setRecords(data?.rows || [])
      setResetRecords(false)
    } else {
      setRecords([...records, ...(data?.rows || [])])
    }
  }, [data?.rows])




  return renderByPlatform({
    "coco777bet": (
      <CocoGameRecordPage
        dates={dates}
        setDates={setDates}
        handleFetchData={handleFetchData}
        records={records}
        dataCount={data?.total || 0}
      />
    )
  }, (
    <CocoGameRecordPage
      dates={dates}
      setDates={setDates}
      handleFetchData={handleFetchData}
      records={records}
      dataCount={data?.total || 0}
    />
  ))
};
