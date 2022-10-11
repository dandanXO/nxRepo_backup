import React, {useCallback, useEffect, useMemo} from "react";
import {
    GetRiskManageResponse, MssRiskRankVo,
    RiskModelMenu,
    useLazyGetRiskManageQuery,
    useLazyGetRiskModelMenuQuery, usePostRiskManageCreateMutation, usePutRiskManageCreateMutation
} from "../api/RiskApi";
import AdminFormModalTemplate from "../templates/AdminFormModalTemplate";
import RiskSettingForm from "./RiskSettingForm";
import {FormInstance, Modal} from "antd";
import {ModalContent} from "../templates/AdminPageTemplate";
import {Store} from "@reduxjs/toolkit";
import {message} from "antd/es";
import useConfirmModal from "../../shared/hooks/useConfirmModal";
import useErrorModal from "../../shared/hooks/useConfirmModal";

type FormResponseData = GetRiskManageResponse;

interface RiskSettingModelProps {
    showModalContent: ModalContent;
    setShowModalContent: React.Dispatch<React.SetStateAction<ModalContent>>;
    form: FormInstance;
    onOk: () => void;
    onAutoCompleteTemplate: () => void;
    // show: boolean;
    // isEdit: boolean;
    editID: number;

    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    // onFieldsChange: () => void;
    // onFinish: () => void;
    // onFinishFailed: () => void;
    // onValuesChange: () => void;
    // currentRiskMenuData: Array<RiskModelMenu>;
    onFormFinish: () => void;
}
const RiskSettingModal = (props: RiskSettingModelProps) => {


    // NOTE: 1. Initial Data
    const initialValues = useMemo(() => {
        // NOTICE: select and switch need initialValue if you want to select one
        return {
            useRcQuota: true,
            enabled: true,
        } as DeepPartial<FormResponseData>;
    }, [])

    // NOTE: 2. Get Data
    const [triggerGetRiskMenu, { currentData: currentRiskMenuData, isLoading: isRiskMenuLoading }] = useLazyGetRiskModelMenuQuery();
    const [triggerGetRisk , { currentData: currentFormData, isLoading: isRiskLoading, isFetching }] = useLazyGetRiskManageQuery();
    // console.log("currentRiskMenuData", currentRiskMenuData);
    // console.log("currentFormData", currentFormData);

    useEffect(() => {
        const loading = isRiskMenuLoading || isRiskLoading;
        props.setLoading(loading);
    }, [isRiskMenuLoading, isRiskLoading])


    // NOTICE: Loading
    useEffect(() => {
        triggerGetRiskMenu({});
    }, []);

    // NOTE: 3. Set form fields from data
    useEffect(() => {
        // NOTICE:
        if(!props.showModalContent.isEdit) return;

        triggerGetRisk({
            modelId: String(props.editID),
        });

        if(!currentFormData) return;

        props.form.setFieldsValue({
            modelName: currentFormData.modelName,
            riskModelName: currentRiskMenuData.filter(menu => menu.riskModelName === currentFormData.riskModelName)[0].id,
            firstLoan: currentFormData.firstLoan,
            repeatLoan: currentFormData.repeatLoan,
            useRcQuota: currentFormData.useRcQuota,
            enabled: currentFormData.enabled,
            remark: currentFormData.remark,
        })

    }, [props.showModalContent.isEdit, currentFormData])


    // NOTE: POST or Put form data
    const [triggerPostRisk, { data: postRiskData, isLoading: isPostRiskLoading , isSuccess: isPostRiskSuccess }] = usePostRiskManageCreateMutation();
    const [triggerPutRisk, { data: putRiskData, isLoading: isPutRiskLoading, isSuccess: isPutRiskSuccess }] = usePutRiskManageCreateMutation();

    // NOTICE: 4.Form Actions
    const onFinish = useCallback(() => {
        const fields = props.form.getFieldsValue();
        // NOTE: Fetch RiskModel
        const riskModel = currentRiskMenuData.filter(menu => menu.id === fields["riskModelName"])[0];
        const riskModelName = riskModel.riskModelName;


        // NOTICE: Edit
        const isEdit = props.showModalContent.isEdit;
        const modelId = props.editID;

        // console.log("fields.before", JSON.parse(JSON.stringify(fields)));
        Object.keys(fields).map(key => {

            if(key === "firstLoan" || key === "repeatLoan") {
                fields[key].map((record, index) => {
                    fields[key][index] = {
                        balance: Number(record.balance),
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
        }
        // console.log("fields.after", fields);

        // NOTE: Create or Edit
        const triggerAPI = !props.showModalContent.isEdit ? triggerPostRisk : triggerPutRisk;
        // console.log("triggerAPI", !props.showModalContent.isEdit ? "triggerPostRisk" : "triggerPutRisk");
        // console.log("fields", fields);



    // const errorModal = useErrorModal("ant4");
    // console.log("errorModal", errorModal);

        // NOTE: Request
        triggerAPI(fields).unwrap().then((responseData) => {
            // console.log("responseData", responseData);
            props.form.resetFields();
            props.onFormFinish();
            props.setShowModalContent({
                show: false,
                isEdit: false,
            })

        })
        // .catch((error) => {
            // console.log("error");
            // Modal.config({
            //     rootPrefixCls: "ant4"
            // })
            // errorModal("JI");
            // message.config({
            //     prefixCls: "ant4"
            // })
            // errorModal("asdf")
            // message.error("error.error")
            // Modal.error({
            //     title: "error.error"
            // })
            // errorModal({
            //     title: "error.error1"
            // })
        // }).finally(() => {
        //     console.log("finally");
            // errorModal({
            //     title: "error.error2"
            // })
            // Modal.error({
            //     title: "12",
            // })
        // })

    }, [props.editID, currentRiskMenuData])

    const onFinishFailed = useCallback(() => {
        alert("1")
    }, [])

    const onFieldsChange = useCallback((changedFields, allFields) => {
    }, [])

    const onValuesChange = useCallback((changedFields, allFields) => {
    }, [])

    return (
        <AdminFormModalTemplate
            show={props.showModalContent.show}
            isEdit={props.showModalContent.isEdit}
            hasAddForm={true}
            hasEditForm={true}
            addTitle={"添加风控配置"}
            editTitle={"修改风控配置"}
            handleCloseModal={() => {
                console.log("handleCloseModal")
                props.form.resetFields();
                props.setShowModalContent({
                    show: false,
                    isEdit: false,
                })
            }}
            onOk={props.onOk}
            autoComplete={true}
            onAutoCompleteTemplate={props.onAutoCompleteTemplate}
        >
            <RiskSettingForm
                form={props.form}
                isEdit={props.showModalContent.isEdit}
                id={props.editID}
                onFieldsChange={onFieldsChange}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onValuesChange={onValuesChange}
                currentRiskMenuData={currentRiskMenuData}
                initialValues={initialValues as Store}
            />
        </AdminFormModalTemplate>
    )
}
export default RiskSettingModal;
