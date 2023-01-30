
import {AdminTable} from "../../shared/components/AdminTable";
import AdminPage from "../../shared/components/AdminPage";
import React, {useEffect, useState} from "react";
import {ProColumns} from "@ant-design/pro-components";
import {useAdminFormModal} from "../../ads/components/pages/ActivityAdsPage/useAdminFormModal";
import {Button, FormInstance, Space, Table} from "antd";
import {
    CollectDistributionQueryRequest,
    CollectDistributionQueryResponse,
    DistributionSummary,
    Stage,
} from "../types/index";

import {StageContainer, StageItem, StagePanel, StageTitle, StageTotal} from "../components/Stage/stage";
import {useGetOverdueProductNamesQuery, useLazyGetOverdueSummaryQuery, useLazyGetOverdueDistributionQuery} from "../services/OverdueDistributionAPI";

type StageData = {
    [stage: string]: Omit<DistributionSummary, "stage">;
}

export const OverdueDistributionPage = () => {

    const [triggerFetchSummary, {data: summaryResponseData}] = useLazyGetOverdueSummaryQuery();
    const [summaryData, setSummaryData] = useState<StageData | null>({
        [Stage.T_1] : {
            todoTotal: 0,
            doneTotal: 0,
        },
        [Stage.T0] : {
            todoTotal: 0,
            doneTotal: 0,
        },
    });

    useEffect(() => {
        const s1 = summaryResponseData?.summaries?.filter(item => item.stage === Stage.S1)[0];
        const s2 = summaryResponseData?.summaries?.filter(item => item.stage === Stage.S2)[0];
        const s3 = summaryResponseData?.summaries?.filter(item => item.stage === Stage.S3)[0];
        const s4 = summaryResponseData?.summaries?.filter(item => item.stage === Stage.S4)[0];
        setSummaryData({
            [Stage.S1] : {
                todoTotal: s1?.todoTotal,
                doneTotal: s1?.doneTotal,
            },
            [Stage.S2] : {
                todoTotal: s2?.todoTotal,
                doneTotal: s2?.doneTotal,
            },
            [Stage.S3] : {
                todoTotal: s3?.todoTotal,
                doneTotal: s3?.doneTotal,
            },
            [Stage.S4] : {
                todoTotal: s4?.todoTotal,
                doneTotal: s4?.doneTotal,
            },
        })
    }, [summaryResponseData])

    const { currentData: productList, isSuccess: isGetProductNamesSuccess} = useGetOverdueProductNamesQuery(null);

    const productListMap = (productList?.reduce((previousItem, currentItem) => {
        return {
            ...previousItem,
            [currentItem.productId]: {
                text: currentItem.productName,
            }
        }
    }, {"": {text:"全部"} }) as any)


    const columns: ProColumns<CollectDistributionQueryResponse, "text">[] = [
        {
            key: 'id',
            title: 'ID',
            dataIndex: 'id',
            hideInSearch: true,
            hideInTable: true,
            width: 80,
        },
        {
            key: 'merchantName',
            title: '商戶名',
            dataIndex: 'merchantName',
            initialValue: "",
            width: 300,
            hideInSearch: true,
        },
        {
            key: 'orderNo',
            title: '订单编号',
            dataIndex: 'orderNo',
            initialValue: "",
            width: 300,
        },
        {
            key: 'appName',
            title: 'APP名称',
            dataIndex: 'appName',
            initialValue: "",
            width: 300,
        },
        {
            key: 'productName',
            title: '产品名称',
            dataIndex: 'productName',
            initialValue: "",
            width: 300,
            hideInSearch: true,
        },
        {
            key: 'productId',
            title: '产品名称',
            dataIndex: 'productId',
            width: 300,
            hideInTable: true,
            initialValue: "",
            valueType: "select",
            valueEnum: productListMap,
        },
        {
            key: 'phoneNo',
            title: '手机号',
            dataIndex: 'phoneNo',
            initialValue: "",
            width: 300,
        },
        {
            key: 'userName',
            title: '姓名',
            dataIndex: 'userName',
            initialValue: "",
            width: 300,
        },
        {
            key: 'deviceMoney',
            title: '申请金额',
            dataIndex: 'deviceMoney',
            hideInSearch: true,
            initialValue: "",
            width: 300,
        },
        {
            key: 'time',
            title: '展期次数',
            dataIndex: 'time',
            hideInSearch: true,
            initialValue: "",
            width: 300,
        },
        {
            key: 'expireTime',
            title: '逾期日',
            dataIndex: 'expireTime',
            hideInSearch: true,
            initialValue: "",
            width: 300,
        },
        {
            key: 'stage',
            title: '逾期阶段',
            dataIndex: 'stage',
            hideInTable: true,
            initialValue: Stage.T_1,
            width: 300,
            // valueEnum: Stage,
            valueEnum: {
                [Stage.T0]: Stage.T0,
                [Stage.T_1]: Stage.T_1,
            },
            valueType: 'select',
        },
    ]

    // NOTE: GET list and item
    const [triggerGetList, {
        currentData: currentItemListData,
        isLoading: isGetListLoading,
        isFetching: isGetListFetching
    }] = useLazyGetOverdueDistributionQuery();

    const [formState, setFormState] = useState<CollectDistributionQueryRequest>({
        stage: Stage.T_1,
        pageNum: 1,
        pageSize: 10,
    })
    const {
        showModalContent,
        setShowModalContent,
        onModalOk,
        onCloseModal,
        editID,
        form,
        onAddItem,
        onEditItem,
        onDeleteItem,
        contextHolder,
        modal,
    } = useAdminFormModal({
        // triggerGet,
        triggerGetList,
        // triggerDelete,
    });

    useEffect(() => {
        triggerFetchSummary(null);
        triggerGetList(formState);
    }, []);

    const [selectedRow, setSelectedRow] = useState([]);

    const onSelectChange = (selectedRowKeys) => {
        setSelectedRow(selectedRowKeys);
    };

    return (
        <AdminPage navigator={{
            ancestor: {
                path: "",
                breadcrumbName: "首页",
            },
            parent: {
                path: "",
                breadcrumbName: "逾期催收",
            },
            self: {
                path: "",
                breadcrumbName:"逾期订单分配"
            }
        }}>
            <>
                <StagePanel>
                    <StageContainer>
                        <StageItem>
                            <StageTitle>{Stage.S1}待分案</StageTitle>
                            <StageTotal>{summaryData[Stage.S1]?.todoTotal}</StageTotal>
                        </StageItem>
                        <StageItem>
                            <StageTitle>{Stage.S1}已分案</StageTitle>
                            <StageTotal>{summaryData[Stage.S1]?.doneTotal}</StageTotal>
                        </StageItem>
                    </StageContainer>
                    <StageContainer>
                        <StageItem>
                            <StageTitle>{Stage.S2}待分案</StageTitle>
                            <StageTotal>{summaryData[Stage.S2]?.todoTotal}</StageTotal>
                        </StageItem>
                        <StageItem>
                            <StageTitle>{Stage.S2}已分案</StageTitle>
                            <StageTotal>{summaryData[Stage.S2]?.doneTotal}</StageTotal>
                        </StageItem>
                    </StageContainer>
                    <StageContainer>
                        <StageItem>
                            <StageTitle>{Stage.S3}待分案</StageTitle>
                            <StageTotal>{summaryData[Stage.S3]?.todoTotal}</StageTotal>
                        </StageItem>
                        <StageItem>
                            <StageTitle>{Stage.S3}已分案</StageTitle>
                            <StageTotal>{summaryData[Stage.S3]?.doneTotal}</StageTotal>
                        </StageItem>
                    </StageContainer>
                    <StageContainer>
                        <StageItem>
                            <StageTitle>{Stage.S4}待分案</StageTitle>
                            <StageTotal>{summaryData[Stage.S4]?.todoTotal}</StageTotal>
                        </StageItem>
                        <StageItem>
                            <StageTitle>{Stage.S4}已分案</StageTitle>
                            <StageTotal>{summaryData[Stage.S4]?.doneTotal}</StageTotal>
                        </StageItem>
                    </StageContainer>
                </StagePanel>

                <AdminTable<CollectDistributionQueryResponse>
                    tableHeaderColumns={columns}
                    tableDatasource={currentItemListData?.records}
                    hasAddForm={false}
                    searchable={true}
                    headerTitle={
                        <Space>
                            <Button key="1" type="primary" ghost disabled={false} onClick={() => {}}>自选订单分配</Button>
                            <Button key="2" type="primary" ghost disabled={false} onClick={() => {}}>依阶段分配</Button>
                        </Space>
                    }
                    isSearchFromClient={false}
                    onFormSearchCallback={(form: FormInstance) => {
                        const searchFormState = form.getFieldsValue();
                        const searchForm = {
                            ...formState,
                            ...searchFormState,
                        };
                        setFormState(searchForm)
                        console.log("searchForm", searchForm)
                        triggerGetList(searchForm)
                    }}
                    onFormResetCallback={() => {
                        console.log("onFormResetCallback");
                    }}
                    rowKey={"id"}
                    rowSelection={{
                        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
                        selectedRowKeys: selectedRow,
                        onChange: onSelectChange,
                    }}
                />
                {/*NOTICE: Modal*/}
                <div>{contextHolder}</div>
            </>
        </AdminPage>
    )
}
