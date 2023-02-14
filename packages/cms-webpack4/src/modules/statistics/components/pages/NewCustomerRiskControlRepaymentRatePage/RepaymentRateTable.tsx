import {AdminTable} from "../../../../shared/components/common/AdminTable";
import {ProColumns} from "@ant-design/pro-components";
import {RiskPaymentRateResponseRiskPaymentRateResponse} from "../../../api/NewCustomerRepaymentRateApi";

export const RepaymentRateTable = () => {
    const tableHeaderColumns: ProColumns<RiskPaymentRateResponseRiskPaymentRateResponse, "text">[] = [
        {
            key: 'loanDate',
            title: '放款日期',
            dataIndex: 'loanDate',
            hideInSearch: true,
            initialValue: "",
            valueType: "date",
        },
        {
            key: 'finishCount',
            title: '放款笔数',
            dataIndex: 'finishCount',
            hideInSearch: true,
            initialValue: "",
        },
        {
            key: 'finishCount',
            title: '放款用户数',
            dataIndex: 'finishCount',
            hideInSearch: true,
            initialValue: "",
        },
        {
            key: 'finishCount',
            title: '放款金额',
            dataIndex: 'finishCount',
            hideInSearch: true,
            initialValue: "",
        },
        {
            key: 'finishCount',
            title: '待还款笔数',
            dataIndex: 'finishCount',
            hideInSearch: true,
            initialValue: "",
        },
        {
            key: 'finishCount',
            title: '待还用户数',
            dataIndex: 'finishCount',
            hideInSearch: true,
            initialValue: "",
        },
        {
            key: 'finishCount',
            title: '待还金额',
            dataIndex: 'finishCount',
            hideInSearch: true,
            initialValue: "",
        },
        {
            key: 'finishCount',
            title: '已结清笔数',
            dataIndex: 'finishCount',
            hideInSearch: true,
            initialValue: "",
        },
        {
            key: 'finishCount',
            title: '已结清用户数',
            dataIndex: 'finishCount',
            hideInSearch: true,
            initialValue: "",
        },
        {
            key: 'finishCount',
            title: '已结清金额',
            dataIndex: 'finishCount',
            hideInSearch: true,
            initialValue: "",
        },
        {
            key: 'finishCount',
            title: '已逾期笔数',
            dataIndex: 'finishCount',
            hideInSearch: true,
            initialValue: "",
        },
        {
            key: 'finishCount',
            title: '已逾期用户数',
            dataIndex: 'finishCount',
            hideInSearch: true,
            initialValue: "",
        },
        {
            key: 'finishCount',
            title: '已逾期金额',
            dataIndex: 'finishCount',
            hideInSearch: true,
            initialValue: "",
        },
    ]
    // return (
    //     <AdminTable tableHeaderColumns={tableHeaderColumns} tableDatasource={} hasAddForm={}/>
    // )
    return (<div>test</div>)
}
