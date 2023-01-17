import {AdminTable} from "../../shared/components/AdminTable";
import {ActivityModel, useLazyGetActivitiesQuery} from "../../ads/service/AdsApi";
import AdminPage from "../../shared/components/AdminPage";
import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {ProColumns} from "@ant-design/pro-components";
import {useAdminFormModal} from "../../ads/components/pages/ActivityAdsPage/useAdminFormModal";
import {Button, FormInstance, Space} from "antd";
import {
    CollectDistributionQueryRequest,
    CollectDistributionQueryResponse,
    DistributionSummaryDistributionSummary,
    Stage, useGetProductNamesQuery,
    useLazyGetDistributionQuery, useLazyGetProductNamesQuery,
    useLazyGetSummaryQuery
} from "../services/TodayDistributionAPI";
import {ProColumnsOperationConstant} from "../../shared/components/ProColumnsOperationConstant";
import {useGetAvailableMerchantListQuery} from "../../product/service/product/ProductApi";

const StagePanel = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 60px;
`
const StageContainer = styled.div`
    border-left: 1px solid #000;
    padding-right: 47px;
`
const StageItem = styled.div`
    display: inline-block;
    height: 72px;
    padding-left: 24px;
`
const StageTitle = styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.45);
`
const StageTotal = styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
    color: rgba(0, 0, 0, 0.85);
`

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
            valueEnum: Stage,
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

    // if(!currentItemListData) return null;

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
                            <Button key="1" type="primary" ghost disabled={false} onClick={() => {}}>自选订单分配</Button>
                            <Button key="2" type="primary" ghost disabled={false} onClick={() => {}}>依阶段分配</Button>
                        </Space>
                    }
                    // onSubmit={(params: any) => {
                    //     console.log("params", params);
                    // }}
                    // onReset={() => {
                    //     console.log("onReset");
                    // }}
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
