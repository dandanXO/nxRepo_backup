import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { GetUserOrders } from '../../api/types/userInfoTypes/getUserOrders';
import { UserId } from '../../../../types/UserId';
import { useLazyGetUserOrdersListQuery } from '../../api/UserInfoApi';
import { useEffect, useState } from 'react';
const LoanInfo = ({userId}:UserId) => {

    const [triggerGetList, { currentData, isLoading, isFetching,isSuccess }] = useLazyGetUserOrdersListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    const [pageable,setPagealbe]=useState({ userId,pageNum: 1, pageSize: 10 })
    const [loanInfo,setLoanInfo]=useState<any>()
    useEffect(() => {
        triggerGetList(pageable)
    }, [pageable]);

    useEffect(()=>{
        if(currentData!==undefined){
            setLoanInfo(currentData)
        }
    },[currentData])

    
    const pageOnChange = (current, pageSize) => {
        setPagealbe({ ...pageable, pageNum: current, pageSize: pageSize })
    }
    const columns: ProColumns<GetUserOrders>[] = [

        { title: '订单编号', dataIndex: 'orderNo', key: 'orderNo' },
        { title: '借款产品', dataIndex: 'productName', key: 'productName' },
        { title: '借款金额', dataIndex: 'deviceMoney', key: 'deviceMoney' },
        { title: '到帐金额', dataIndex: 'lendMoney', key: 'lendMoney' },
        { title: '放款时间', dataIndex: 'loanTime', key: 'loanTime', valueType: 'dateTime' },
        {
            title: '状态', dataIndex: 'status', key: 'status', valueType: 'select', initialValue: '',
            valueEnum: {
                '': { text: '不限', color: '' },
                '0': { text: '审核中', color: 'blue' },
                '1': { text: '机审拒绝', color: 'red' },
                '2': { text: '人审拒绝', color: 'red' },
                '3': { text: '待打款', color: 'purple' },
                '4': { text: '打款中', color: 'blue' },
                '5': { text: '打款失败', color: 'red' },
                '6': { text: '还款中', color: 'blue' },
                '7': { text: '已逾期', color: 'orange' },
                '8': { text: '已完成', color: 'green' },
            },
        },
        { title: '申请时间', dataIndex: 'applyTime', key: 'applyTime', valueType: 'dateTime' },
        { title: '还款时间', dataIndex: 'payTime', key: 'payTime', valueType: 'dateTime' },
        { title: '到期時間', dataIndex: 'expireTime', key: 'expireTime', valueType: 'dateTime' },
    ]

  return (

      <ProTable<GetUserOrders>
          columns={columns}
          dataSource={!isLoading && loanInfo?.records || []}
          loading={isLoading}
          rowKey="id"
          search={false}
          pagination={{
              showSizeChanger: true,
              defaultPageSize: 10,
              onChange: pageOnChange,
              total: loanInfo?.totalRecords,
              current: loanInfo?.records?.length === 0 ? 0 : loanInfo?.currentPage,
          }}
      />

    )
}

export default LoanInfo;

