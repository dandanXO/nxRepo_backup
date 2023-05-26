import { AdminTable } from "../../shared/components/common/AdminTable";
import AdminPage from "../../shared/components/common/AdminPage";
import React, { useEffect, useState } from "react";
import { ProColumns } from "@ant-design/pro-components";
import { Button, FormInstance, message, Space, Table } from "antd";
import {
    CollectDistributionQueryRequest,
    CollectDistributionQueryResponse,
    DistributionSummary,
    Stage,
} from "../types";

import { StageContainer, StageItem, StagePanel, StageTitle, StageTotal } from "../components/Stage/stage";
import {
    useGetOverdueProductNamesQuery,
    useLazyGetOverdueSummaryQuery,
    useLazyGetOverdueDistributionQuery,
    usePostOverdueDistributionSelectedMutation, usePostOverdueDistributionStageMutation
} from "../services/OverdueDistributionAPI";
import { CommonOrderDistributionModal } from "../modals/CommonOrderDistributionModal";
import CopyText from "../../shared/components/other/CopyText";

type StageData = {
    [stage: string]: Omit<DistributionSummary, "stage">;
};

export const OverdueDistributionPage = (): JSX.Element => {
    const [triggerFetchSummary, { data: summaryResponseData }] = useLazyGetOverdueSummaryQuery();
    const [summaryData, setSummaryData] = useState<StageData>({});

    useEffect(() => {
        const summaryData = {};
        summaryResponseData?.summaries?.map((item) => {
            summaryData[item.stage] = {
                todoTotal: item?.todoTotal,
                doneTotal: item?.doneTotal,
            };
        });
        // console.log("summaryData", summaryData);
        setSummaryData(summaryData);
    }, [summaryResponseData]);

    const { currentData: productList } = useGetOverdueProductNamesQuery(null);

    const productListMap = new Map().set('', { text: '全部' });
    productList?.map((i) => {
        return productListMap.set(i.productId, { text: i.productName });
    });


    const stageEnum = {};
    Object.keys(summaryData).map((key) => {
        stageEnum[key] = {
            [Stage.S1]: "S1",
            [Stage.S2]: "S2",
            [Stage.S3]: "S3",
            [Stage.S4]: "S4",
            [Stage.S5]: "S5",
        }[key];
    });
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
            hideInSearch: true,
        },
        {
            key: 'orderNo',
            title: '订单编号',
            dataIndex: 'orderNo',
            initialValue: "",
            render: (text) => <CopyText text={text} />
        },
        {
            key: 'appName',
            title: 'APP名称',
            dataIndex: 'appName',
            initialValue: "",
            render: (text) => <CopyText text={text} />
        },
        {
            key: 'productName',
            title: '产品名称',
            dataIndex: 'productName',
            initialValue: "",
            hideInSearch: true,
        },
        {
            key: 'productId',
            title: '产品名称',
            dataIndex: 'productId',
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
            render: (text) => <CopyText text={text} />
        },
        {
            key: 'userName',
            title: '姓名',
            dataIndex: 'userName',
            initialValue: "",
            render: (text) => <CopyText text={text} />
        },
        {
            key: 'oldUser',
            title: '老客下单',
            dataIndex: 'oldUser',
            initialValue: "",
            valueEnum: {
                '': { text: '不限' },
                true: { text: '是' },
                false: { text: '否' },
            },
            valueType: 'select',
            align: 'center'
        },
        {
            key: 'deviceMoney',
            title: '申请金额',
            dataIndex: 'deviceMoney',
            hideInSearch: true,
            initialValue: "",
        },
        {
            key: 'lengNum',
            title: '展期次数',
            dataIndex: "lengNum",
            hideInSearch: true,
            initialValue: "",
        },
        {
            key: 'expireTime',
            title: '逾期日',
            dataIndex: 'expireTime',
            hideInSearch: true,
            initialValue: "",
            valueType: "date",
            tooltip: "起算时间为该日00:00:00"
        },
        {
            key: 'stage',
            title: '逾期阶段',
            dataIndex: 'stage',
            hideInTable: true,
            initialValue: Stage.S1,
            valueEnum: stageEnum,
            valueType: 'select',
        },
        {
            key: 'dateRange',
            title: '逾期时间',
            dataIndex: 'createdAtRange',
            valueType: 'dateRange',
            hideInTable: true,
        },
        {
            key: 'overdueDays',
            title: '逾期天数',
            dataIndex: 'overdueDays',
            hideInSearch: true,
        },

    ];

    // NOTE: GET list and item
    const [triggerGetList, {
        currentData: currentItemListData,
        isFetching: isGetListFetching
    }] = useLazyGetOverdueDistributionQuery();

    const [formState, setFormState] = useState<CollectDistributionQueryRequest>({
        stage: Stage.S1,
        pageNum: 1,
        pageSize: 10,
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
    };

    const [messageApi, contextHolder] = message.useMessage();

    const handlerModalOk = (checkedCollector: number[]) => {
        // console.log("checkedCollector", checkedCollector);
        setShowModal(false);

        const refresh = () => {
            // console.log("refresh");
            setSelectedRow([]);
            triggerFetchSummary(null);
            triggerGetList(formState);
        };
        if(isSelectedByOrder) {
            // console.log("orderIds", selectedRow);
            postDistributionSelected({
                collectorIds: checkedCollector,
                orderIds: selectedRow,
            }).then(() => {
                refresh();
                messageApi.success("分配成功");
            }).catch(() => {
                messageApi.error("分配失敗");
            });
        } else {
            // console.log("stage", distributionStage);
            postDistributionStage({
                collectorIds: checkedCollector,
                stage: distributionStage,
            }).then(() => {
                refresh();
                messageApi.success("分配成功");
            }).catch(() => {
                messageApi.error("分配失敗");
            });
        }
    };

    // 紀錄目前選擇階段
    const [searchedStage, setSearchedStage] = useState(Stage.S1);

    const [isSelectedByOrder, setIsSelectedByOrder] = useState(true);
    const [postDistributionSelected] = usePostOverdueDistributionSelectedMutation();
    const [distributionStage, setSelectedDistributionStage] = useState<Stage>();
    const [postDistributionStage] = usePostOverdueDistributionStageMutation();


    const pageOnChange = (current, pageSize) => {
        // console.log("pageOnChange.current", current)
        // console.log("pageOnChange.pageSize", pageSize)
        // console.log("pageOnChange.formState", formState)
        const newFormStage = { ...formState, pageNum: current, pageSize: pageSize };
        setFormState(newFormStage);
        triggerGetList(newFormStage);
    };

    const refresh = () => {
        // console.log("pageOnChange.formState", formState)
        triggerGetList(formState);
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
                breadcrumbName: "逾期订单分配"
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
                    loading={isGetListFetching}
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
                        // 移除預設選擇項目
                        setSelectedRow([]);

                        // 紀錄目前選擇階段
                        const searchFormState = form.getFieldsValue();
                        setSearchedStage(searchFormState.stage);

                        const finalFormData = {
                            pageNum: formState.pageNum,
                            pageSize: formState.pageSize,
                            ...searchFormState,
                        };

                        if(finalFormData.dateRange) {
                            finalFormData.expireStartTime = searchFormState.dateRange[0].format('YYYY-MM-DDT00:00:00');
                            finalFormData.expireEndTime = searchFormState.dateRange[1].format('YYYY-MM-DDT23:59:59');
                        }
                        delete finalFormData["dateRange"];

                        // 設定最終查詢
                        setFormState({
                            // ...formState,
                            ...finalFormData
                        });
                        triggerGetList(finalFormData);
                    }}
                    onFormResetCallback={(form: FormInstance) => {
                        setFormState({
                            ...formState,
                            dateRange: null,
                            expireStartTime: null,
                            expireEndTime: null,
                        });
                        const searchFormState = form.getFieldsValue();
                        form.setFieldsValue({
                            ...searchFormState,
                            dateRange: null,
                            expireStartTime: null,
                            expireEndTime: null,
                        });
                    }}
                    triggerToRefreshList={refresh}
                    rowKey={"orderId"}
                    rowSelection={{
                        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
                        selectedRowKeys: selectedRow,
                        onChange: onSelectChange,
                    }}
                    currentPage={currentItemListData?.currentPage}
                    total={currentItemListData?.totalRecords}
                    pageOnChange={pageOnChange}

                />
                {/*NOTICE: Modal*/}
                <div>{contextHolder}</div>

                <CommonOrderDistributionModal
                    show={showModal}
                    handleCloseModal={handleModalClose}
                    onOk={handlerModalOk}
                    isSelectedByOrder={isSelectedByOrder}
                    summaryData={summaryData}
                    setDistributionStage={setSelectedDistributionStage}
                    type={"overdue"}
                    searchedStage={searchedStage}
                    stage={distributionStage}
                    hasS5={Object.keys(summaryData).indexOf("S5") > 1 }
                />
            </>
        </AdminPage>
    );
};
