import { useAllowLoginRouterRules } from "../../../../router/hooks/useAllowLoginRouterRules";
import { GetSignInRecordResponseData, useGetSignInRecordMutation } from "../../../../../external";
import { useEffect, useState } from "react";
import { AppLocalStorage } from "../../../../../persistant/localstorage";
import { BackNavigation } from "../../../../components-bs/BackNavigation/BackNavigation";
import { usePageNavigate } from "../../../../router/hooks/usePageNavigate";
import { Table } from "../../../../components-bs/Table";
import { AppLocalStorageKey } from "../../../../../persistant/AppLocalStorageKey";
import useBreakpoint from "../../../../pageTemplate/hooks/useBreakpoint";
import { MobileDailySignInRecordPage } from "./MobileDailySignInRecordPage";
import { formatLocaleMoney } from "../../../../utils/format";
import { PageContainer } from "../../../../components-bs/PageContainer";


export const DailySignInRecordPage = () => {
  useAllowLoginRouterRules();

  const [triggerGetSignInRecord, { data }] = useGetSignInRecordMutation();
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState<GetSignInRecordResponseData[]>([])

  const { isMobile } = useBreakpoint();

  const handleFetchData = () => {
    if (page < (data?.page?.page_count || 0)) {
      setPage(page + 1)
    }
  }

  const { onClickToCheckInDaily } = usePageNavigate();

  const columns = [
    { title: 'ID', name: 'id', key: 'id' },
    { title: 'Nivel VIP', name: 'vip_level', key: 'vip_level', render: (record: any) => `LV${record.vip_level}`  },
    { title: 'Coleta Contínua', name: 'days', key: 'days', render: (record: any) => record.days === 1 ? `${record.days}dia` : `${record.days}dias` },
    { title: 'Obter Recompensas', name: 'cashback', key: 'cashback', render: (record: any) => `R$ ${formatLocaleMoney(record.cashback / 100)}` },
    { title: 'Tempo', name: 'created_at', key: 'created_at' },
  ]

  useEffect(() => {
    triggerGetSignInRecord({
      limit: isMobile ? 10000 : 10,
      page: page,
      token: AppLocalStorage.getItem(AppLocalStorageKey.token) || "",
    })
  }, [page])

  useEffect(() => {
    setRecords([...records, ...(data?.data || [])])

  }, [data?.data])

  if (isMobile) {
    return <MobileDailySignInRecordPage records={records} />
  }

  return (
    <PageContainer>
      <BackNavigation
        onClick={() => onClickToCheckInDaily()}
      />
      <div className='text-white '>
        <div className='rounded-lg max-h-[80vh] overflow-hidden'>
          <Table
            titleStyle='text-sm border-transparent !border-x-0'
            contentStyle='text-base !border-x-0 !border-b !py-6'
            fetchData={handleFetchData}
            dataSource={records}
            columns={columns}
            dataCount={data?.page?.count || 0}
          />
        </div>
      </div>
    </PageContainer>
  )
}



