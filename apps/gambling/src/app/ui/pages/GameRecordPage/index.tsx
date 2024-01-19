import moment from 'moment';
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { GetUserGameRecordResponse, useLazyGetUserGameRecordQuery } from "../../../external";
import { AppLocalStorage } from '../../../persistant/localstorage';
import { useAllowLoginRouterRules } from "../../router/hooks/useAllowLoginRouterRules";
import { AppLocalStorageKey } from "../../../persistant/AppLocalStorageKey";
import { GameRecordPage as CocoGameRecordPage } from './env/u1';
import { GameRecordPage as RioGameRecordPage } from './env/u2';
import { renderByUVersion } from "../../utils/renderByUVersion";

export interface IGameRecordPageProps {
  dates: moment.Moment[]
  setDates: Dispatch<SetStateAction<moment.Moment[]>>
  handleFetchData: () => void
  records: GetUserGameRecordResponse['rows']
  dataCount: number
}

export const GameRecordPage = () => {
  useAllowLoginRouterRules();

  const pageSize = 10
  const startDate = moment().subtract(7, 'days');
  const endDate = moment();
  const dateFormat = 'YYYYMMDD';
  const [dates, setDates] = useState([startDate, endDate]);


  const [triggerGetRecord, { data }] = useLazyGetUserGameRecordQuery();
  const [resetRecords, setResetRecords] = useState(false);
  const [records, setRecords] = useState<GetUserGameRecordResponse["rows"]>([])
  const [page, setPage] = useState(1)

  const handleFetchData = () => {
    if (records.length < (data?.data.total || 0)) {
      setPage((records.length / pageSize) + 1)
    }
  }


  useEffect(() => {
    triggerGetRecord({
      dayMin: dates[0].format(dateFormat),
      dayMax: dates[1].format(dateFormat),
      pageNum: page,
      pageSize: pageSize,
    });
  }, [page, dates]);

  useEffect(() => {
    setResetRecords(true)
    setPage(1)
  }, [dates])


  useEffect(() => {
    if (resetRecords) {
      setRecords(data?.data.records || [])
      setResetRecords(false)
    } else {
      setRecords([...records, ...(data?.data.records || [])])
    }
  }, [data?.data.records])




  return renderByUVersion({
    "u1": (
      <CocoGameRecordPage
        dates={dates}
        setDates={setDates}
        handleFetchData={handleFetchData}
        records={records}
        dataCount={data?.total || 0}
      />
    ),
    "u2": (
      <RioGameRecordPage
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
