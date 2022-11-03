import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import AdminPage from "../../../../shared/components/AdminPage";
import {ProColumns} from "@ant-design/pro-components";
import {GetProductListResponseProduct} from "../../../../product/service/product/domain/getProductList";
import {
    useLazyGetRiskManageListQuery,
    useLazyGetRiskManageQuery,
    useLazyGetRiskModelMenuQuery,
    usePostRiskManageCreateMutation,
    usePutRiskManageCreateMutation
} from "../../../service/RiskApi";
import {useForm} from "antd/es/form/Form";
import {AdminTable, ModalContent} from "../../../../shared/components/AdminTable";
import RiskSettingForm from "./RiskSettingForm";
import RiskSettingModal from "./RiskSettingModal";
import {GetRiskManageResponse} from "../../../service/response/GetRiskManageResponse";
import {RiskManageList} from "../../../domain/vo/RiskManageList";
import {MssRiskRankVo} from "../../../domain/vo/MssRiskRankVo";

export type FormResponseData = GetRiskManageResponse;

export const RiskSettingPage = () => {

    // NOTE: UI Loading
    const [loading, setLoading] = useState(false);


    // NOTE: Fetch
    const [triggerGetList, { currentData, isLoading, isFetching }] = useLazyGetRiskManageListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });

    // useHook
    useEffect(() => {
        triggerGetList(null);
    }, []);



    useEffect(() => {
        setLoading(isFetching);
    }, [isFetching])

    // NOTE: Edit
    const [editID, setEditID] = useState<number>();

    // NOTE: Table
    const columns = useMemo(() => {
        const columns: ProColumns<RiskManageList>[] = [
            {
                key: 'option',
                title: '操作',
                valueType: 'option',
                render: (text, record, _, action) => {
                    return [
                        <a key="editable" onClick={() => {
                            // console.log("record", record);
                            setEditID(record.id);
                            setShowModalContent({
                                show: true,
                                isEdit: true,
                            })
                        }}>修改</a>,
                    ]
                },
                width: 80,
            },
            {
                key: 'id',
                dataIndex: 'id',
                hideInSearch: true,
                hideInTable: true,
                // NOTICE:
                // tooltip: "",
                // ellipsis: false,
                // copyable: true,
                // hideInSearch: false,
                // hideInTable: false,
                // hideInForm: false,
                // hideInDescriptions: false,
                // onFilter: true,
                // disable: true,
            },
            { key: 'modelName', title: '风控名称', dataIndex: 'modelName', initialValue: "" },
            {
                key: 'enabled',
                title: '状态', dataIndex: 'enabled', valueType: 'select', initialValue: 'all',
                valueEnum: {
                    all: { text: '全部', status: 'Default' },
                    true: { text: '启用', status: 'Success' },
                    false: { text: '停用', status: 'Default' },
                },
                width: 80,
            },
            { key: 'createTime', title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime' },
            { key: 'updateTime', title: '更新时间', dataIndex: 'updateTime', valueType: 'dateTime' },
        ];
        return columns;

    }, []);

    // NOTICE: Form
    const [form] = useForm()

    // NOTICE: Modal
    // NOTE: autoComplete
    const onAutoCompleteTemplate = useCallback(() => {
        const mockRequest = {
            modelName: String(new Date().getTime()),
            remark: "remark",
            // firstLoan: [
            //     {providerRank: 'A', loanCount: '4000'},
            //     {providerRank: 'B', loanCount: '3000'},
            //     {providerRank: 'C', loanCount: '2000'},
            //     {providerRank: 'D', loanCount: '1000'},
            //     {providerRank: 'E', loanCount: '0'}
            // ],
            // repeatLoan: [
            //     {providerRank: 'A', loanCount: '8000'},
            //     {providerRank: 'B', loanCount: '6000'},
            //     {providerRank: 'C', loanCount: '4000'},
            //     {providerRank: 'D', loanCount: '2000'},
            //     {providerRank: 'E', loanCount: '0'},
            // ],
             firstLoan: [
                {min: 50,max:58, loanCount: '100', loanAmount: '200'},
                {min: 47,max:49, loanCount: '100', loanAmount: '200'},
                {min: 31,max:32, loanCount: '100', loanAmount: '200'},
                {min: 21,max:22, loanCount: '100', loanAmount: '200'},
                {min: 1,max:12, loanCount: '100', loanAmount: '200'},
            ],
            repeatLoan: [
                {min: 50,max:58, loanCount: '100', loanAmount: '200'},
                {min: 47,max:49, loanCount: '100', loanAmount: '200'},
                {min: 31,max:32, loanCount: '100', loanAmount: '200'},
                {min: 21,max:22, loanCount: '100', loanAmount: '200'},
                {min: 1,max:12, loanCount: '100', loanAmount: '200'},
            ],
            riskModelName: 1,
            useRcQuota: true,
            enabled: true,
        }
        form.setFieldsValue(mockRequest)
    }, [form])

    // NOTE: OK
    const onOk = useCallback(() => {
        form.submit();
    }, [form])

    // NOTICE: Modal
    const [showModalContent, setShowModalContent] = useState<ModalContent>({
        show: false,
        isEdit: false,
    });

    // NOTICE: Form

    // NOTE: 1. Initial Data
    const initialValues = useMemo(() => {
        // NOTICE: select and switch need initialValue if you want to select one
        return {
            useRcQuota: true,
            enabled: true,
        } as DeepPartial<FormResponseData>;
    }, [])

    // NOTE: 2. Get Data
    // NOTE: 2.1 Menus
    const [triggerGetRiskMenu, { currentData: currentRiskMenuData, isLoading: isRiskMenuLoading }] = useLazyGetRiskModelMenuQuery();

    // NOTICE: Loading
    useEffect(() => {
        triggerGetRiskMenu({});
    }, []);


    // NOTE: 2.2 Risks
    const [triggerGetRisk , { data: previousRiskData, currentData: currentFormData, isLoading: isRiskLoading, isFetching: isRiskFetching, isSuccess: isRiskSuccess }] = useLazyGetRiskManageQuery();
    // console.log("isRiskFetching", isRiskFetching);
    // console.log("currentRiskMenuData", currentRiskMenuData);
    // console.log("currentFormData", currentFormData);
    // console.log("isRiskLoading", isRiskLoading);
    // console.log("isRiskFetching", isRiskSuccess);


    useEffect(() => {
        const loading = isRiskMenuLoading || isRiskLoading;
        setLoading(loading);
    }, [isRiskMenuLoading, isRiskLoading])



    useEffect(() => {
        if(showModalContent.isEdit) {
            triggerGetRisk({
                modelId: String(editID),
            });
        }
    }, [showModalContent.isEdit])


    // NOTE: 3. Set form fields from data
    useEffect(() => {
        // NOTICE:
        if(!showModalContent.isEdit) return;

        if(!currentFormData) return;
        const targetMenu = currentRiskMenuData.filter(menu => menu.riskModelName === currentFormData.riskModelName)
        const id = targetMenu && targetMenu[0] && targetMenu[0].id || undefined;
        form.setFieldsValue({
            modelName: currentFormData.modelName,
            riskModelName: id,
            firstLoan: currentFormData.firstLoan,
            repeatLoan: currentFormData.repeatLoan,
            useRcQuota: currentFormData.useRcQuota,
            enabled: currentFormData.enabled,
            remark: currentFormData.remark,
        })

    }, [showModalContent.isEdit, currentFormData])


    // NOTE: POST or Put form data
    const [triggerPostRisk, { data: postRiskData, isLoading: isPostRiskLoading , isSuccess: isPostRiskSuccess }] = usePostRiskManageCreateMutation();
    const [triggerPutRisk, { data: putRiskData, isLoading: isPutRiskLoading, isSuccess: isPutRiskSuccess }] = usePutRiskManageCreateMutation();


    // NOTE: onFieldsChange
    const onFieldsChange = useCallback((changedFields, allFields) => {
       
        const label=changedFields[0].name[0];
        const index=changedFields[0].name[1]===0?0:changedFields[0].name[1]-1;
        const field=changedFields[0].name[2];
        const preField=allFields.filter(i=>i.name[0]===label && i.name[1]===index&&i.name[2]===field);
        console.log(changedFields[0]);
        console.log('preField',preField)
    }, [])


    // NOTICE: Form.3 onFinish
    const onFinish = useCallback(() => {
        const fields = form.getFieldsValue();
        // NOTE: Fetch RiskModel
        const riskModel = currentRiskMenuData.filter(menu => menu.id === fields["riskModelName"])[0];
        const riskModelName = riskModel.riskModelName;


        // NOTICE: Edit
        const isEdit = showModalContent.isEdit;
        const modelId = editID;

        // console.log("fields.before", JSON.parse(JSON.stringify(fields)));
        Object.keys(fields).map(key => {

            if(key === "firstLoan" || key === "repeatLoan") {
                fields[key].map((record, index) => {
                    fields[key][index] = {
                        loanCount: Number(record.loanCount),
                        // 可借额度

                        // NOTE: future
                        // max: 1,
                        // 终始阀值(exclude)

                        // NOTE: future
                        // min: 1,
                        // 起始阀值(include)

                        providerRank: record.providerRank,

                        rank: ["EXCELLENT", "GOOD", "NORMAL", "ORDINARY", "REJECT"][index],
                        // 风控评分等级

                        sort: index + 1,
                        // 排序

                        type: key === "firstLoan" ? 0 : 1 , // 0 | 1
                        // 级距类型 0: 首贷, 1: 复借

                        // min:record.min,
                        // max:record.max,
                        // loanAmount:record.loanAmount
                    } as MssRiskRankVo
                    // NOTE: Edit
                    if(isEdit) {
                        fields[key][index]["modelId"] = modelId;
                        fields[key][index]["id"] = record.id;
                    }
                })
            } else if(key === "riskModelName") {
                fields["riskModelName"] = riskModelName;
            }
        });
        // NOTE: Edit
        if(isEdit) {
            fields["modelId"] = modelId;
            delete fields.modelName;
        }
        // console.log("fields.after", fields);

        // NOTE: Create or Edit
        const triggerAPI = !showModalContent.isEdit ? triggerPostRisk : triggerPutRisk;
        // console.log("triggerAPI", !showModalContent.isEdit ? "triggerPostRisk" : "triggerPutRisk");
        console.log("fields", fields);

        // NOTE: Request
        triggerAPI(fields).unwrap().then((responseData) => {
            form.resetFields();

            triggerGetList(null);

            setShowModalContent({
                show: false,
                isEdit: false,
            })
        })
    }, [showModalContent.isEdit, editID, currentRiskMenuData])

    // NOTICE: Form.4 onFinishFailed
    const onFinishFailed = useCallback(() => {
    }, [])

    // NOTICE: Form.5 onValuesChange
    const onValuesChange = useCallback((changedFields, allFields) => {
    }, [])


    const onAddCallback = useCallback(() => {
        setShowModalContent({
            show: true,
            isEdit: false,
        });
    }, [])


    // NOTE: Post | PUT Data
    return (
        <AdminPage
            navigator={{
                ancestor: {
                    path: "",
                    breadcrumbName: "首页",
                },
                parent: {
                    path: "",
                    breadcrumbName: "风控管理",
                },
                self: {
                    path: "",
                    breadcrumbName:"风控配置"
                }
            }}
            // searchable={false}
        >
            <>
                <AdminTable<GetProductListResponseProduct>
                    tableHeaderColumns={columns}
                    tableDatasource={currentData}
                    loading={loading}
                    onSearchClick={(props: RiskManageList) => {
                        // const {productName, enabled} = props;
                        // const searchedListData = productListData
                        //     .filter(i => productName === "" ? i :  i.productName.toLowerCase().indexOf(productName.toLowerCase()) > -1)
                        //     .filter(i => enabled === "all" ? i : i.enabled.toString() === enabled);
                        return [];
                    }}
                    // NOTE: 新增
                    setShowModalContent={setShowModalContent}
                    searchable={false}
                    hasEditForm={false}
                    onAddCallback={onAddCallback}
                />

                <RiskSettingModal
                    showModalContent={showModalContent}
                    // 關閉
                    setShowModalContent={setShowModalContent}
                    form={form}
                    onOk={onOk}
                    onAutoCompleteTemplate={onAutoCompleteTemplate}
                >
                    <RiskSettingForm
                        form={form}
                        isEdit={showModalContent.isEdit}
                        id={editID}
                        initialValues={initialValues}
                        onFieldsChange={onFieldsChange}
                        onFinish={onFinish}
                        currentRiskMenuData={currentRiskMenuData}
                    />
                </RiskSettingModal>
            </>
        </AdminPage>
    )
}
