import { AdminTable } from '../../../../shared/components/common/AdminTable';
import { ConstantRiskRankEnum } from '../../../../shared/constants/constantRiskRankEnum';
import useGetProviderEnum from '../../../../shared/hooks/common/useGetProviderEnum';
import {
    GetNewCustomerRiskPaymentRateListRequest,
    RiskPaymentRateResponseRiskPaymentRateResponse,
    useLazyGetNewCustomerRiskPaymentRateListQuery,
} from '../../../api/NewCustomerRepaymentRateApi';
import { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { FormInstance } from 'antd';
import { Button } from 'antd/es';
import queryString from 'query-string';
import { useCallback, useEffect, useRef, useState } from 'react';

export const RepaymentRateTable = (): JSX.Element => {
    const [triggerGetNewCustomerRiskPaymentRateList, { currentData, isFetching }] =
        useLazyGetNewCustomerRiskPaymentRateListQuery();

    const [formState, setFormState] = useState<GetNewCustomerRiskPaymentRateListRequest>({
        endTime: '', // 結束時間
        riskControlModel: '', // 风控名稱
        riskRank: '', // 風控標籤
        startTime: '', // 開始時間
        newMember: '',
    });
    useEffect(() => {
        triggerGetNewCustomerRiskPaymentRateList(null);
        triggerGetProviderList(null);
    }, []);

    const triggerGetList = useCallback(() => {
        triggerGetNewCustomerRiskPaymentRateList(formState);
    }, [formState]);

    const { triggerGetProviderList, providerListEnum } = useGetProviderEnum();

    const formatNumber = (num) => num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    const tableHeaderColumns: ProColumns<RiskPaymentRateResponseRiskPaymentRateResponse>[] = [
        {
            key: 'expireTime',
            title: '到期日',
            dataIndex: 'expireTime',
            hideInSearch: true,
            hideInTable: false,
            initialValue: '',
            valueType: 'date',
        },
        {
            key: 'fakeLoanDate',
            title: '到期時間',
            dataIndex: 'fakeLoanDate',
            hideInSearch: false,
            hideInTable: true,
            initialValue: '',
            valueType: 'dateRange',
        },
        {
            key: 'totalCount',
            title: '放款笔数',
            dataIndex: 'totalCount',
            hideInSearch: true,
            hideInTable: false,
            initialValue: '',
        },
        {
            key: 'totalLendUsers',
            title: '放款用户数',
            dataIndex: 'totalLendUsers',
            hideInSearch: true,
            hideInTable: false,
            initialValue: '',
        },
        {
            key: 'totalLendMoney',
            title: '放款金额',
            dataIndex: 'totalLendMoney',
            hideInSearch: true,
            hideInTable: false,
            initialValue: '',
            render: (text) => formatNumber(text),
        },
        {
            key: 'pendingRepaymentCount',
            title: '待还款笔数',
            dataIndex: 'pendingRepaymentCount',
            hideInSearch: true,
            hideInTable: false,
            initialValue: '',
        },
        {
            key: 'pendingRepaymentUsers',
            title: '待还用户数',
            dataIndex: 'pendingRepaymentUsers',
            hideInSearch: true,
            hideInTable: false,
            initialValue: '',
        },
        {
            key: 'pendingRepaymentMoney',
            title: '待还金额',
            dataIndex: 'pendingRepaymentMoney',
            hideInSearch: true,
            hideInTable: false,
            initialValue: '',
            render: (text) => formatNumber(text),
        },
        {
            key: 'finishCount',
            title: '已结清笔数',
            dataIndex: 'finishCount',
            hideInSearch: true,
            hideInTable: false,
            initialValue: '',
        },
        {
            key: 'finishUsers',
            title: '已结清用户数',
            dataIndex: 'finishUsers',
            hideInSearch: true,
            hideInTable: false,
            initialValue: '',
        },
        {
            key: 'finishMoney',
            title: '已结清金额',
            dataIndex: 'finishMoney',
            hideInSearch: true,
            hideInTable: false,
            initialValue: '',
            render: (text) => formatNumber(text),
        },
        {
            key: 'overdueCount',
            title: '已逾期笔数',
            dataIndex: 'overdueCount',
            hideInSearch: true,
            hideInTable: false,
            initialValue: '',
        },
        {
            key: 'overdueUsers',
            title: '已逾期用户数',
            dataIndex: 'overdueUsers',
            hideInSearch: true,
            hideInTable: false,
            initialValue: '',
        },
        {
            key: 'overdueMoney',
            title: '已逾期金额',
            dataIndex: 'overdueMoney',
            hideInSearch: true,
            hideInTable: false,
            initialValue: '',
            render: (text) => formatNumber(text),
        },
        // NOTE: only search
        {
            key: 'riskControlModel',
            hideInTable: true,
            title: '风控应用',
            dataIndex: 'riskControlModel',
            initialValue: '',
            valueEnum: providerListEnum,
            fieldProps: {
                allowClear: false,
            },
        },
        {
            key: 'riskRank',
            hideInTable: true,
            title: '风控标签',
            dataIndex: 'riskRank',
            valueType: 'select',
            valueEnum: ConstantRiskRankEnum,
            initialValue: '',
            fieldProps: {
                allowClear: false,
            },
        },
        {
            title: '是否新客',
            dataIndex: 'newMember',
            valueType: 'select',
            key: 'newMember',
            initialValue: '',
            hideInTable: true,
            valueEnum: {
                '': { text: '不限' },
                true: { text: '是' },
                false: { text: '否' },
            },
        },
    ];
    const formRef = useRef<ProFormInstance>();
    const getSearchParams = () => {
        // @ts-ignore
        const { fakeLoanDate = '', riskControlModel = '', riskRank = '', newMember } = formRef.current.getFieldValue();
        return {
            riskControlModel,
            riskRank,
            newMember,
            startTime: fakeLoanDate ? fakeLoanDate[0].format('YYYY-MM-DD 00:00:00') : '',
            endTime: fakeLoanDate ? fakeLoanDate[1].format('YYYY-MM-DD 23:59:59') : '',
        };
    };

    const onClickHandleExport = () => {
        const searchParams = getSearchParams();
        const searchQueryString = queryString.stringify(searchParams);
        window.open(`/hs/admin/statistics/new-customer-risk-payment-rate/download?${searchQueryString}`);
        setFormState(searchParams);
        triggerGetNewCustomerRiskPaymentRateList(searchParams);
    };

    return (
        <AdminTable<RiskPaymentRateResponseRiskPaymentRateResponse>
            formRef={formRef}
            searchable={true}
            isSearchFromClient={false}
            onFormResetCallback={(form: FormInstance) => {
                form.resetFields();
                triggerGetNewCustomerRiskPaymentRateList(null);
            }}
            onFormSearchCallback={() => {
                const searchForm = getSearchParams();
                setFormState(searchForm);
                triggerGetNewCustomerRiskPaymentRateList(searchForm);
            }}
            toolBarRender={() => [
                <Button onClick={onClickHandleExport} type="primary">
                    导出
                </Button>,
            ]}
            tableHeaderColumns={tableHeaderColumns}
            tableDatasource={currentData}
            triggerToRefreshList={triggerGetList}
            loading={isFetching}
            hasAddForm={false}
            hasEditForm={false}
        />
    );
};
