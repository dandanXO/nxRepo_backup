
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
import {
    useGetOverdueProductNamesQuery,
    useLazyGetOverdueSummaryQuery,
    useLazyGetOverdueDistributionQuery,
    usePostOverdueDistributionSelectedMutation, usePostOverdueDistributionStageMutation
} from "../services/OverdueDistributionAPI";
import {CommonOrderDistributionModal} from "../modals/CommonOrderDistributionModal";
import moment from "moment";

type StageData = {
    [stage: string]: Omit<DistributionSummary, "stage">;
};

export const OverdueDistributionPage = () => {
    const [triggerFetchSummary, {data: summaryResponseData}] = useLazyGetOverdueSummaryQuery();
    const [summaryData, setSummaryData] = useState<StageData>({});

    useEffect(() => {
        let summaryData = {}
        summaryResponseData?.summaries?.map((item, current) => {
            summaryData[item.stage] = {
                todoTotal: item?.todoTotal,
                doneTotal: item?.doneTotal,
            }
        })
        // console.log("summaryData", summaryData);
        setSummaryData(summaryData);
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


    const stageEnum = {}
    Object.keys(summaryData).map((key, currentValue) => {
        stageEnum[key] = {
            [Stage.S1]: "S1",
            [Stage.S2]: "S2",
            [Stage.S3]: "S3",
            [Stage.S4]: "S4",
            [Stage.S5]: "S5",
        }[key];
    })
    // console.log("summaryData", summaryData);
    // console.log("stageEnum", stageEnum);
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
            tooltip: "截止时间为该日23:59:59"
        },
        {
            key: 'stage',
            title: '逾期阶段',
            dataIndex: 'stage',
            hideInTable: true,
            initialValue: Stage.S1,
            width: 300,
            valueEnum: stageEnum,
            valueType: 'select',
        },
        {
            key: 'dateRange',
            title: '逾期时间',
            dataIndex: 'createdAtRange',
            valueType: 'dateRange',
            search: {
                transform: (value: any) => ({ expireStartTime: value[0], expireEndTime: value[1] }),
            },
        },
    ]

    // NOTE: GET list and item
    const [triggerGetList, {
        currentData: currentItemListData,
        isLoading: isGetListLoading,
        isFetching: isGetListFetching
    }] = useLazyGetOverdueDistributionQuery();

    const [formState, setFormState] = useState<CollectDistributionQueryRequest>({
        stage: Stage.S1,
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

    const [showModal, setShowModal] = useState(false);

    const handleModalClose = () => {
        setShowModal(false);
    }

    const handlerModalOk = (checkedCollector: number[]) => {
        // console.log("checkedCollector", checkedCollector);
        setShowModal(false);
        if(isSelectedByOrder) {
            // console.log("orderIds", selectedRow);
            postDistributionSelected({
                collectorIds: checkedCollector,
                orderIds: selectedRow,
            })
        } else {
            // console.log("stage", distributionStage);
            postDistributionStage({
                collectorIds: checkedCollector,
                stage: distributionStage,
            });
        }
    }

    const [isSelectedByOrder, setIsSelectedByOrder] = useState(true);
    const [postDistributionSelected] = usePostOverdueDistributionSelectedMutation();
    const [distributionStage, setDistributionStage] = useState<Stage>();
    const [postDistributionStage] = usePostOverdueDistributionStageMutation();

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

                    {Object.keys(summaryData).indexOf("S5") > 1 && (
                        <StageContainer>
                            <StageItem>
                                <StageTitle>{Stage.S5}待分案</StageTitle>
                                <StageTotal>{summaryData[Stage.S5]?.todoTotal}</StageTotal>
                            </StageItem>
                            <StageItem>
                                <StageTitle>{Stage.S5}已分案</StageTitle>
                                <StageTotal>{summaryData[Stage.S5]?.doneTotal}</StageTotal>
                            </StageItem>
                        </StageContainer>
                    )}
                </StagePanel>

                <AdminTable<CollectDistributionQueryResponse>
                    tableHeaderColumns={columns}
                    tableDatasource={currentItemListData?.records}
                    hasAddForm={false}
                    searchable={true}
                    headerTitle={
                        <Space>
                            <Button key="1" type="primary" ghost disabled={selectedRow.length === 0} onClick={() => {
                                setShowModal(true);
                                setIsSelectedByOrder(true);
                            }}>自选订单分配</Button>
                            <Button key="2" type="primary" ghost disabled={selectedRow.length > 0} onClick={() => {
                                setShowModal(true);
                                setIsSelectedByOrder(false);
                            }}>依阶段分配</Button>
                        </Space>
                    }
                    isSearchFromClient={false}
                    onFormSearchCallback={(form: FormInstance) => {
                        const searchFormState = form.getFieldsValue();
                        const searchForm = {
                            ...formState,
                            ...searchFormState,
                            expireStartTime: moment(searchFormState.dateRange[0]).toISOString(),
                            expireEndTime: moment(searchFormState.dateRange[1]).toISOString(),
                        };
                        delete searchForm["dateRange"]
                        setFormState(searchForm)
                        console.log("searchForm", searchForm)
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

                <CommonOrderDistributionModal
                    show={showModal}
                    handleCloseModal={handleModalClose}
                    onOk={handlerModalOk}
                    isSelectedByOrder={isSelectedByOrder}
                    summaryData={summaryData}
                    setDistributionStage={setDistributionStage}
                    type={"overdue"}
                />
            </>
        </AdminPage>
    )
}
