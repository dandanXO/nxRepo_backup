import {AdminTable} from "../../../../shared/components/common/AdminTable";
import {ProColumns} from "@ant-design/pro-components";
import {
    GetNewCustomerRiskPaymentRateListRequest,
    RiskPaymentRateResponseRiskPaymentRateResponse,
    useLazyGetNewCustomerRiskPaymentRateListQuery
} from "../../../api/NewCustomerRepaymentRateApi";
import {useCallback, useEffect, useState} from "react";
import {FormInstance} from "antd";
import {Button} from "antd/es";
import queryString from "query-string";
import {ConstantRiskRankEnum} from "../../../../shared/constants/constantRiskRankEnum";
import useGetProviderEnum from "../../../../shared/hooks/common/useGetProviderEnum";

export const RepaymentRateTable = () => {

    const [triggerGetNewCustomerRiskPaymentRateList, {data, currentData, isLoading, isFetching, isSuccess, isError}] = useLazyGetNewCustomerRiskPaymentRateListQuery();

    useEffect(() => {
        triggerGetNewCustomerRiskPaymentRateList(null);
        triggerGetProviderList(null);
    }, [])

    const triggerGetList = useCallback(() => {
        triggerGetNewCustomerRiskPaymentRateList(null)
    }, [])

    const [formState, setFormState] = useState<GetNewCustomerRiskPaymentRateListRequest>({
        endTime: "",
        // 結束時間
        riskControlModel: "",
        // 风控名稱
        riskRank: "",
        // 風控標籤
        startTime: ""
        // 開始時間
    })


    const { triggerGetProviderList, providerListEnum } = useGetProviderEnum();

    const tableHeaderColumns: ProColumns<RiskPaymentRateResponseRiskPaymentRateResponse, "text">[] = [
        {
            key: 'loanDate',
            title: '放款日期',
            dataIndex: 'loanDate',
            hideInSearch: true,
            hideInTable: false,
            initialValue: "",
            valueType: 'date',
        },
        {
            key: 'fakeLoanDate',
            title: '放款日期',
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
        },
        // NOTE: only search
        {
            key: 'riskControlModel',
            hideInTable: true,
            title: '风控应用',
            dataIndex: 'riskControlModel',
            initialValue: formState.riskControlModel || "",
            valueEnum: providerListEnum,
            fieldProps: {
                allowClear: false,
            }
        },
        {
            key: 'riskRank',
            hideInTable: true,
            title: '风控标签',
            dataIndex: 'riskRank',
            valueType: 'select',
            valueEnum: ConstantRiskRankEnum,
            initialValue: formState.riskRank || "",
            fieldProps: {
                allowClear: false,
            }
        },
    ]

    const onClickHandleExport = useCallback(() => {
        const searchQueryString = queryString.stringify(formState);
        const path = `/hs/admin/statistics/new-customer-risk-payment-rate?${searchQueryString}`;
        // console.log("path", path)
        window.open(path);
    }, [formState])

    return (
        <AdminTable <RiskPaymentRateResponseRiskPaymentRateResponse>
            searchable={true}
            isSearchFromClient={false}
            onFormSearchCallback={(form: FormInstance) => {
                // setSelectedRow([]);
                const searchFormState = form.getFieldsValue();
                // setSearchedStage(searchFormState.stage);
                const searchForm = {
                    ...formState,
                    ...searchFormState,
                };
                if(searchFormState.fakeLoanDate) {
                    // searchForm.startTime = searchFormState.fakeLoanDate[0].format('YYYY-MM-DDTHH:mm:ss');
                    // searchForm.endTime = searchFormState.fakeLoanDate[1].format('YYYY-MM-DDTHH:mm:ss');
                    searchForm.startTime = searchFormState.fakeLoanDate[0].format('YYYY-MM-DD HH:mm:ss');
                    searchForm.endTime = searchFormState.fakeLoanDate[1].format('YYYY-MM-DD HH:mm:ss');
                }
                delete searchForm["fakeLoanDate"]
                setFormState(searchForm)
                // console.log("searchForm", searchForm)
                triggerGetNewCustomerRiskPaymentRateList(searchForm);
            }}
            toolBarRender={() => [<Button onClick={onClickHandleExport} type='primary'>导出</Button>]}
            tableHeaderColumns={tableHeaderColumns}
            tableDatasource={currentData}
            triggerToRefreshList={triggerGetList}
            loading={isFetching}
            hasAddForm={false}
            hasEditForm={false}
        />
    )
}
