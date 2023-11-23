import {SectionContainer} from "../../components/container/SectionContainer";
import {useAllowLoginRouterRules} from "../../router/useAllowLoginRouterRules";
import {useNavigate} from "react-router";
import { GetSignInRecordResponseData, useGetSignInRecordMutation } from "../../../external";
import { useEffect, useState } from "react";
import {AppLocalStorage} from "../../../persistant/localstorage";
import {BackNavigation} from "../../components/BackNavigation/BackNavigation";
import {usePageNavigate} from "../../hooks/usePageNavigate";
import { Table } from "../../components/Table";
import {AppLocalStorageKey} from "../../../persistant/AppLocalStorageKey";


export const DailySignInRecordPage = () => {
  useAllowLoginRouterRules();

  const [triggerGetSignInRecord, {data}] = useGetSignInRecordMutation();
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState<GetSignInRecordResponseData[]>([])



  const handleFetchData = () => {
    if(page < (data?.page?.page_count || 0)) {
      setPage(page + 1)
    }
  }

  const {onClickToCheckInDaily} = usePageNavigate();

  const columns = [
    { title: 'ID', name: 'id', key: 'id'},
    { title: 'Nivel VIP', name: 'vip_level', key: 'vip_level'},
    { title: 'Coleta Contínua', name: 'days', key: 'days', render: (record:any) => record.days === 1 ? `${record.days}dia`: `${record.days}dias`},
    { title: 'Obter Recompensas', name: 'cashback', key: 'cashback', render: (record: any) => `R$ ${(record.cashback / 100).toLocaleString()}`},
    { title: 'Tempo', name: 'created_at', key: 'created_at' },
  ]

  useEffect(() => {
    triggerGetSignInRecord({
      limit: 10,
      page: page,
      token: AppLocalStorage.getItem(AppLocalStorageKey.token) || "",
    })
  }, [page])

  useEffect(() => {
    setRecords([...records, ...(data?.data || [])])
  }, [data?.data])

  return (
    <>
      <div className={"p-8"}>

        <SectionContainer id={"game-record-section"}>

          <BackNavigation onClick={() => onClickToCheckInDaily()}/>

          <div className='rounded-lg h-[80vh] overflow-hidden'>
            <Table
              fetchData={handleFetchData}
              dataSource={records}
              columns={columns}
              dataCount={data?.page?.count || 0}
            />
          </div>
        </SectionContainer>
      </div>

    </>
  )
}



