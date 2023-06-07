import React from "react";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import usePageSearchParams from "../../../shared/hooks/usePageSearchParams";

const initSearchList = {
    merchantName:'', pageNum: 1, pageSize: 10
}

export const TodayPhoneUrgeListTable = () => {

    const { handleToDetailPage } = usePageSearchParams({searchListParams: initSearchList})

    const handleClickPromote = () => {
        handleToDetailPage('/todayLoanManage/todayPhoneUrgeList/detail', '/todayLoanManage/todayPhoneUrgeList')
    }

    const columns: ProColumns[] = [
        {
            title: '操作',
            valueType: "option",
            key: 'promote',
            render: (text, record, _, action) => {
                return <a key="editable" onClick={() => handleClickPromote()} >跟进</a>
            },
        }
    ]

    return <ProTable
        columns={columns}
    />
}
