import {AdminTable} from "../../../../shared/components/common/AdminTable";
import {ProColumns, ProFormInstance} from "@ant-design/pro-components";
import {
    GetNewCustomerRiskPaymentRateListRequest,
    RiskPaymentRateResponseRiskPaymentRateResponse,
    useLazyGetNewCustomerRiskPaymentRateListQuery
} from "../../../api/NewCustomerRepaymentRateApi";
import {useCallback, useEffect, useRef, useState} from "react";
import {FormInstance} from "antd";
import {Button} from "antd/es";
import queryString from "query-string";
import {ConstantRiskRankEnum} from "../../../../shared/constants/constantRiskRankEnum";
import useGetProviderEnum from "../../../../shared/hooks/common/useGetProviderEnum";
import useGetChannelEnum from "../../../../shared/hooks/useGetChannelEnum";
import usePageSearchParams from "../../../../shared/hooks/usePageSearchParams";

export const RepaymentRateTable = () => {
    // NOTE: 資料
    const { triggerGetChannelList, channelListEnum } = useGetChannelEnum();
    const { triggerGetProviderList, providerListEnum } = useGetProviderEnum();
    const [triggerGetNewCustomerRiskPaymentRateList, {data, currentData, isLoading, isFetching, isSuccess, isError}] = useLazyGetNewCustomerRiskPaymentRateListQuery();

    // NOTE: 搜尋與分頁
    const initSearchList: GetNewCustomerRiskPaymentRateListRequest = {
        channelId: null, // 渠道 ID
        endTime: "",          // 結束時間
        riskControlModel: "", // 风控名稱
        riskRank: "",         // 風控標籤
        startTime: "",         // 開始時間
        newMember:""
    }

    const { searchList, setSearchList} = usePageSearchParams({ searchListParams: initSearchList });

    const getSearchParams = () => {
        // @ts-ignore
        const { channelId, fakeLoanDate = '', riskControlModel = '', riskRank = '', newMember }: GetNewCustomerRiskPaymentRateListRequest = formRef.current.getFieldValue();
        return {
            channelId,
            riskControlModel,
            riskRank,
            newMember,
            startTime: fakeLoanDate ? fakeLoanDate[0].format('YYYY-MM-DD 00:00:00') : '',
            endTime: fakeLoanDate ? fakeLoanDate[1].format('YYYY-MM-DD 23:59:59') : ''
        }
    }


    // NOTE: 更新列表
    const triggerGetList = (searchList) => {
        triggerGetNewCustomerRiskPaymentRateList(searchList)
    }

    const formRef = useRef<ProFormInstance>();

    // NOTE: refactor me
    const formatNumber = (num) => num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

    const tableHeaderColumns: ProColumns<RiskPaymentRateResponseRiskPaymentRateResponse, "text">[] = [
        {
            key: 'expireTime',
            title: '到期日',
            dataIndex: 'expireTime',
            hideInSearch: true,
            hideInTable: false,
            initialValue: "",
            valueType: 'date',
        },
        {
            key: 'fakeLoanDate',
            title: '到期時間',
            dataIndex: 'fakeLoanDate',
            hideInSearch: false,
            hideInTable: true,
            initialValue: "",
            valueType: 'dateRange',
        },
        {
            key: 'totalCount',
            title: '放款笔数',
            dataIndex: 'totalCount',
            hideInSearch: true,
            hideInTable: false,
            initialValue: "",
        },
        {
            key: 'totalLendUsers',
            title: '放款用户数',
            dataIndex: 'totalLendUsers',
            hideInSearch: true,
            hideInTable: false,
            initialValue: "",
        },
        {
            key: 'totalLendMoney',
            title: '放款金额',
            dataIndex: 'totalLendMoney',
            hideInSearch: true,
            hideInTable: false,
            initialValue: "",
            render:(text)=>formatNumber(text)
        },
        {
            key: 'pendingRepaymentCount',
            title: '待还款笔数',
            dataIndex: 'pendingRepaymentCount',
            hideInSearch: true,
            hideInTable: false,
            initialValue: "",
        },
        {
            key: 'pendingRepaymentUsers',
            title: '待还用户数',
            dataIndex: 'pendingRepaymentUsers',
            hideInSearch: true,
            hideInTable: false,
            initialValue: "",
        },
        {
            key: 'pendingRepaymentMoney',
            title: '待还金额',
            dataIndex: 'pendingRepaymentMoney',
            hideInSearch: true,
            hideInTable: false,
            initialValue: "",
            render:(text)=>formatNumber(text)
        },
        {
            key: 'finishCount',
            title: '已结清笔数',
            dataIndex: 'finishCount',
            hideInSearch: true,
            hideInTable: false,
            initialValue: "",
        },
        {
            key: 'finishUsers',
            title: '已结清用户数',
            dataIndex: 'finishUsers',
            hideInSearch: true,
            hideInTable: false,
            initialValue: "",
        },
        {
            key: 'finishMoney',
            title: '已结清金额',
            dataIndex: 'finishMoney',
            hideInSearch: true,
            hideInTable: false,
            initialValue: "",
            render:(text)=>formatNumber(text)
        },
        {
            key: 'overdueCount',
            title: '已逾期笔数',
            dataIndex: 'overdueCount',
            hideInSearch: true,
            hideInTable: false,
            initialValue: "",
        },
        {
            key: 'overdueUsers',
            title: '已逾期用户数',
            dataIndex: 'overdueUsers',
            hideInSearch: true,
            hideInTable: false,
            initialValue: "",
        },
        {
            key: 'overdueMoney',
            title: '已逾期金额',
            dataIndex: 'overdueMoney',
            hideInSearch: true,
            hideInTable: false,
            initialValue: "",
            render:(text)=>formatNumber(text)
        },
        // NOTE: only search
        {
            title: '申请渠道',
            dataIndex: 'channelId',
            valueType: 'select',
            key: 'channelId',
            valueEnum: channelListEnum,
            hideInSearch: false,
            hideInTable: true
        },
        {
            key: 'riskControlModel',
            hideInSearch: false,
            hideInTable: true,
            title: '风控应用',
            dataIndex: 'riskControlModel',
            valueEnum: providerListEnum,
            fieldProps: {
                allowClear: false,
            }
        },
        {
            key: 'riskRank',
            hideInSearch: false,
            hideInTable: true,
            title: '风控标签',
            dataIndex: 'riskRank',
            valueType: 'select',
            valueEnum: ConstantRiskRankEnum,
            fieldProps: {
                allowClear: false,
            }
        },
        {
            key: 'newMember',
            title: '是否新客',
            dataIndex: 'newMember',
            valueType: 'select',
            hideInSearch: false,
            hideInTable: true,
            valueEnum: {
                '': { text: '不限' },
                true: { text: '是' },
                false: { text: '否' },
            },
        },
    ]

    const onUserClickSearch = (form: FormInstance) => {
        const searchList = getSearchParams();
        setSearchList(searchList)
        triggerGetList(searchList);
    }

    const onUserClickReset = (form: FormInstance)=>{
        // Self State
        setSearchList(initSearchList);
        // System reload list
        triggerGetList(initSearchList);
    }

    const onClickHandleExport = () => {
        // self state
        const searchList = getSearchParams();
        setSearchList(searchList)
        // get excel
        const searchQueryString = queryString.stringify(searchList);
        window.open(`/hs/admin/statistics/new-customer-risk-payment-rate/download?${searchQueryString}`);
        // refresh list
        triggerGetList(searchList);
    }

    const onUserChangePage = (current, pageSize) => {
        setSearchList({ ...searchList, pageNum: current, pageSize: pageSize })
    }

    useEffect(() => {
        triggerGetList(searchList);
        triggerGetProviderList(null);
        triggerGetChannelList(null);
    }, [])

    return (
        <AdminTable <RiskPaymentRateResponseRiskPaymentRateResponse>
            // static
            // rowKey={}
            formRef={formRef}
            toolBarRender={() => [<Button onClick={onClickHandleExport} type='primary'>导出</Button>]}
            // dynamic
            loading={isFetching}
            tableHeaderColumns={tableHeaderColumns}
            tableDatasource={currentData}
            triggerToRefreshList={() => triggerGetList(searchList)}
            pageOnChange={onUserChangePage}
            searchable={true}
            isSearchFromClient={false}
            onFormResetCallback={onUserClickReset}
            onFormSearchCallback={onUserClickSearch}
            hasAddForm={false}
            hasEditForm={false}

        />
    )
}
