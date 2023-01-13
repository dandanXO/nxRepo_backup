import {AdminTable} from "../../shared/components/AdminTable";
import {ActivityModel, useLazyGetActivitiesQuery} from "../../ads/service/AdsApi";
import AdminPage from "../../shared/components/AdminPage";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {ProColumns} from "@ant-design/pro-components";
import {useAdminFormModal} from "../../ads/components/pages/ActivityAdsPage/useAdminFormModal";
import {Button, Space} from "antd";
import {
    CollectDistributionQueryResponse,
    DistributionSummaryDistributionSummary,
    Stage,
    useLazyGetDistributionQuery,
    useLazyGetSummaryQuery
} from "../services/TodayDistributionAPI";

const StagePanel = styled.div``
const StageContainer = styled.div``
const StageItem = styled.div``
const StageTitle = styled.div``
const StageTotal = styled.div``

type StageData = {
    [stage: string]: Omit<DistributionSummaryDistributionSummary, "stage">;
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
        const t1 = summaryResponseData?.summaries.filter(item => item.stage === Stage.T_1)[0];
        const t0 = summaryResponseData?.summaries.filter(item => item.stage === Stage.T0)[0];
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

    useEffect(() => {
        triggerFetchSummary(null);
    }, []);

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
            key: 'name',
            title: '到期日',
            dataIndex: 'name',
            hideInTable: true,
            initialValue: "T-1",
            width: 300,
        },
    ]

    // NOTE: GET list and item
    // const [triggerGetList, {
    //     currentData: currentItemListData,
    //     isLoading: isGetListLoading,
    //     isFetching: isGetListFetching
    // }] = useLazyGetActivitiesQuery({
    //     pollingInterval: 0,
    //     refetchOnFocus: false,
    //     refetchOnReconnect: false
    // });

    const [triggerGetList, {
        currentData: currentItemListData,
        isLoading: isGetListLoading,
        isFetching: isGetListFetching
    }] = useLazyGetDistributionQuery();
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
                    tableDatasource={currentItemListData.records}
                    hasAddForm={false}
                    searchable={true}
                    headerTitle={
                        <Space>
                            <Button key="passButton" type="primary" ghost disabled={false} onClick={() => {}}>自选订单分配</Button>
                            <Button key="passButton" type="primary" ghost disabled={false} onClick={() => {}}>依阶段分配</Button>
                        </Space>
                    }
                    // onSubmit={(params: any) => {
                    //     console.log("params", params);
                    // }}
                    // onReset={() => {
                    //     console.log("onReset");
                    // }}
                    onFormSearchCallback={() => {
                        console.log("onFormSearchCallback");
                    }}
                    onFormResetCallback={() => {
                        console.log("onFormResetCallback");
                    }}

                />
                {/*<AdminFormCustomModal*/}
                {/*    title={adminModalTitle}*/}
                {/*    width={"1200px"}*/}
                {/*    showModalContent={showModalContent}*/}
                {/*    setShowModalContent={setShowModalContent}*/}
                {/*    onOk={onModalOk}*/}
                {/*    onCloseModal={onCloseModal}*/}
                {/*>*/}
                {/*    <ActivityAdsForm*/}
                {/*        form={form}*/}
                {/*        isEdit={showModalContent.isEdit}*/}
                {/*        id={editID}*/}
                {/*        initialValues={initialValues}*/}
                {/*        onFieldsChange={onFieldsChange}*/}
                {/*        onFinish={onFormFinish}*/}
                {/*        modal={modal}*/}
                {/*    />*/}
                {/*</AdminFormCustomModal>*/}
                {/*NOTICE: Modal*/}
                <div>{contextHolder}</div>
            </>
        </AdminPage>
    )
}
