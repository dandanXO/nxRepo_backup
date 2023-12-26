import moment from 'moment';
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { GetUserGameRecordResponse, useGetUserGameRecordMutation } from "../../../external";
import { AppLocalStorage } from '../../../persistant/localstorage';
import { useAllowLoginRouterRules } from "../../router/useAllowLoginRouterRules";
import { AppLocalStorageKey } from "../../../persistant/AppLocalStorageKey";
import { GameRecordPage as CocoGameRecordPage } from './env/coco';
import { GameRecordPage as RioGameRecordPage } from './env/riojungle';
import { renderByPlatform } from "../../utils/renderByPlatform";

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


  const [triggerGetRecord, { data }] = useGetUserGameRecordMutation({});
  const [resetRecords, setResetRecords] = useState(false);
  const [records, setRecords] = useState<GetUserGameRecordResponse["rows"]>([])
  const [page, setPage] = useState(1)

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
    ),
    "riojungle777bet": (
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
