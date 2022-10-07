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
}
const RiskSettingModal = (props: RiskSettingModelProps) => {

    // NOTE: Initial Data
    const initialValues = useMemo(() => {
        // NOTICE: select and switch need initialValue if you want to select one
        return {
            useRcQuota: true,
            enabled: true,
        } as DeepPartial<FormResponseData>;
    }, [])

    // NOTE: Get Data
    const [triggerGetRiskMenu, { currentData: currentRiskMenuData, isLoading: isRiskMenuLoading }] = useLazyGetRiskModelMenuQuery();
    const [triggerGetRisk , { currentData: currentFormData, isLoading: isRiskLoading, isFetching }] = useLazyGetRiskManageQuery();

    useEffect(() => {
        const loading = isRiskMenuLoading || isRiskLoading;
        props.setLoading(loading);
    }, [isRiskMenuLoading, isRiskLoading])

    // NOTICE: Loading
    useEffect(() => {
        triggerGetRiskMenu({});
    }, []);

    // NOTE: Set form fields from data
    useEffect(() => {
        // NOTE: 1

        // NOTICE:
        if(!triggerGetRiskMenu) return;

        // NOTE: 2
        if(props.showModalContent.isEdit) {
            triggerGetRisk({
                modelId: String(props.editID),
            });
        }

        if(!currentFormData) return;
        // NOTE: 3
        props.form.setFieldsValue({
            modelName: currentFormData.modelName,
            riskModelName: currentFormData.riskModelName,
            firstLoan: currentFormData.firstLoan,
            repeatLoan: currentFormData.repeatLoan,
            useRcQuota: currentFormData.useRcQuota,
            enabled: currentFormData.enabled,
            remark: currentFormData.remark,
        } as FormResponseData)

    }, [props.editID, currentFormData])


    // NOTE: POST or Put form data
    const [triggerPostRisk, { data: postRiskData, isLoading: isPostRiskLoading , isSuccess: isPostRiskSuccess }] = usePostRiskManageCreateMutation();
    const [triggerPutRisk, { data: putRiskData, isLoading: isPutRiskLoading, isSuccess: isPutRiskSuccess }] = usePutRiskManageCreateMutation();





    const onFinish = useCallback(() => {
        const fields = props.form.getFieldsValue();
        // console.log("fields.before", JSON.parse(JSON.stringify(fields)));
        Object.keys(fields).map(key => {
            if(key === "firstLoan" || key === "repeatLoan") {
                fields[key].map((record, index) => {
                    fields[key][index] = {
                        balance: record.balance,
                        // 可借额度

                        // NOTE: error
                        id:  index,
                        // 风控评分等级流水号

                        // NOTE: future
                        max: 1,
                        // 终始阀值(exclude)

                        // NOTE: future
                        min: 1,
                        // 起始阀值(include)

                        // NOTE: future
                        modelId: 4,
                        // 风控模组流水号

                        rank: ["EXCELLENT", "GOOD", "NORMAL", "ORDINARY", "REJECT"][index],
                        // 风控评分等级

                        sort: index + 1,
                        // 排序

                        type: fields[key] === "firstLoan" ? 0 : 1 , // 0 | 1
                        // 级距类型 0: 首贷, 1: 复借
                    } as MssRiskRankVo
                })
            } else if(key === "riskModelName") {
                fields["riskModelName"] = currentRiskMenuData.filter(menu => menu.id === fields[key])[0].riskModelName
            }
        });
        // console.log("fields.after", fields);
        const triggerAPI = !props.showModalContent.isEdit ? triggerPostRisk : triggerPutRisk;
        console.log("triggerAPI", !props.showModalContent.isEdit ? "triggerPostRisk" : "triggerPutRisk");
        console.log("fields", fields);

        // if(isPostRiskSuccess || isPutRiskSuccess) {
        //     props.form.resetFields();
        // } else {
        //     // const message = postRiskData?.message || putRiskData?.message
        // }

        // triggerAPI(fields);


    // const errorModal = useErrorModal("ant4");
    // console.log("errorModal", errorModal);
        triggerAPI(fields).unwrap().then((responseData) => {
            console.log("responseData", responseData);
            props.form.resetFields();
        })
        //     .catch((error) => {
        //     console.log("error");
        //     Modal.config({
        //         rootPrefixCls: "ant4"
        //     })
        //     errorModal("JI");
        //     message.config({
        //         prefixCls: "ant4"
        //     })
        //     errorModal("asdf")
        //     message.error("error.error")
        //     Modal.error({
        //         title: "error.error"
        //     })
        //     errorModal({
        //         title: "error.error1"
        //     })
        // }).finally(() => {
        //     console.log("finally");
        //     errorModal({
        //         title: "error.error2"
        //     })
        //     Modal.error({
        //         title: "12",
        //     })
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
