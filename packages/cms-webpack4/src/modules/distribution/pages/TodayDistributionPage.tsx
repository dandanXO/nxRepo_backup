import {AdminTable} from "../../shared/components/AdminTable";
import AdminPage from "../../shared/components/AdminPage";
import React, {useEffect, useState} from "react";
import {ProColumns} from "@ant-design/pro-components";
import {useAdminFormModal} from "../../ads/components/pages/ActivityAdsPage/useAdminFormModal";
import {Button, FormInstance, Space, Table} from "antd";
import {
    useGetProductNamesQuery,
    useLazyGetDistributionQuery,
    useLazyGetSummaryQuery
} from "../services/TodayDistributionAPI";

import  {
    CollectDistributionQueryRequest,
    CollectDistributionQueryResponse,
    DistributionSummary,
    Stage,
} from "../types/index"

import {useGetAvailableMerchantListQuery} from "../../product/service/product/ProductApi";
import {StageContainer, StageItem, StagePanel, StageTitle, StageTotal} from "../components/Stage/stage";
import {OrderDistributionModal} from "../modals/OrderDistributionModal";

type StageData = {
    [stage: string]: Omit<DistributionSummary, "stage">;
}

export const TodayDistributionPage = () => {
    const [triggerFetchSummary, {data: summaryResponseData}] = useLazyGetSummaryQuery();
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
        const t1 = summaryResponseData?.summaries?.filter(item => item.stage === Stage.T_1)[0];
        const t0 = summaryResponseData?.summaries?.filter(item => item.stage === Stage.T0)[0];
        setSummaryData({
            [Stage.T_1] : {
                todoTotal: t1?.todoTotal,
                doneTotal: t1?.doneTotal,
            },
            [Stage.T0] : {
                todoTotal: t0?.todoTotal,
                doneTotal: t0?.doneTotal,
            },
        })
    }, [summaryResponseData])



    const { currentData: merchantList, isSuccess: isGetMerchantListSuccess } = useGetAvailableMerchantListQuery(null);
    const { currentData: productList, isSuccess: isGetProductNamesSuccess} = useGetProductNamesQuery(null);

    let tempMerchantListMap = (merchantList?.reduce((previousItem, currentItem) => {
        return {
            ...previousItem,
            [currentItem.merchantId]: {
                text: currentItem.name,
            }
        }
    }, {"": {text:"全部"} }) as any)

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
            key: 'merchantId',
            title: '商戶名',
            dataIndex: 'merchantId',
            width: 300,
            hideInTable: true,
            initialValue: "",
            valueType: 'select',
            valueEnum: tempMerchantListMap,
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
            key: 'expireTime',
            title: '到期日',
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
    }] = useLazyGetDistributionQuery();

    const [formState, setFormState] = useState<CollectDistributionQueryRequest>({
        stage: Stage.T_1,
        pageNum: 1,
        pageSize: 10,
    })

    useEffect(() => {
        triggerFetchSummary(null);
        triggerGetList(formState);
    }, []);

    const [selectedRow, setSelectedRow] = useState([]);

    const onSelectChange = (selectedRowKeys) => {
        setSelectedRow(selectedRowKeys);
    };

    const [showModal, setShowModal] = useState(false);
    const handleModalClose = () => {
        setShowModal(false);
    }

    const handlerModalOk = () => {
        setShowModal(false);
    }

    return (
        <AdminPage navigator={{
            ancestor: {
                path: "",
                breadcrumbName: "首页",
            },
            parent: {
                path: "",
                breadcrumbName: "当日催收",
            },
            self: {
                path: "",
                breadcrumbName:"当日订单分配"
            }
        }}>
            <>
                <StagePanel>
                    <StageContainer>
                        <StageItem>
                            <StageTitle>T-1待分案</StageTitle>
                            <StageTotal>{summaryData[Stage.T_1]?.todoTotal}</StageTotal>
                        </StageItem>
                        <StageItem>
                            <StageTitle>T-1已分案</StageTitle>
                            <StageTotal>{summaryData[Stage.T_1]?.doneTotal}</StageTotal>
                        </StageItem>
                    </StageContainer>
                    <StageContainer>
                        <StageItem>
                            <StageTitle>T0待分案</StageTitle>
                            <StageTotal>{summaryData[Stage.T0]?.todoTotal}</StageTotal>
                        </StageItem>
                        <StageItem>
                            <StageTitle>T0已分案</StageTitle>
                            <StageTotal>{summaryData[Stage.T0]?.doneTotal}</StageTotal>
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
                            <Button key="1" type="primary" ghost disabled={false} onClick={() => {
                                setShowModal(true);
                            }}>自选订单分配</Button>
                            <Button key="2" type="primary" ghost disabled={false} onClick={() => {
                                setShowModal(true);
                            }}>依阶段分配</Button>
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
                        // console.log("searchForm", searchForm)
                        triggerGetList(searchForm)
                    }}
                    onFormResetCallback={() => {
                        // console.log("onFormResetCallback");
                    }}
                    rowKey={"id"}
                    rowSelection={{
                        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
                        selectedRowKeys: selectedRow,
                        onChange: onSelectChange,
                    }}
                />
                {/*NOTICE: Modal*/}
                {/*<div>{contextHolder}</div>*/}
                <OrderDistributionModal show={showModal} handleCloseModal={handleModalClose} onOk={handlerModalOk}/>
            </>
        </AdminPage>
    )
}
