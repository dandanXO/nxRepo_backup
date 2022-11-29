import {ActivityAdListPage} from "../../../import/ActivityAdListPage";
import React, {useCallback, useMemo, useState} from "react";
import {ActivityAdsForm} from "./ActivityAdsForm";
import {useForm} from "antd/es/form/Form";
import {ModalContent} from "../../../../shared/components/AdminTable";
import {FormResponseData} from "../../../../risk/components/pages/RiskSettingPage";
import {MockAdTemplate1Data} from "../../../import/ActivityAdListPage/MockAdTemplate1Data";

interface IUseAdminFormModal {
    // initialValues: any
    onFieldsChange: any;
}

const useAdminFormModal = (props: IUseAdminFormModal) => {
    const [form] = useForm()

    // NOTICE: Modal
    const [showModalContent, setShowModalContent] = useState<ModalContent>({
        show: false,
        isEdit: false,
    });

    // NOTE: Edit
    const [editID, setEditID] = useState<number>();

    return {
        // initialValues,
        form,
        showModalContent,
        setShowModalContent,
        editID,
    }
}
export const ActivityAdsPage = () => {
    const {
        form,
        showModalContent,
        setShowModalContent,
        editID,
    } = useAdminFormModal({
        onFieldsChange: {},
    });

    // NOTE: 1. Initial Data
    const initialValues = useMemo(() => {
        // NOTICE: select and switch need initialValue if you want to select one
        return {
            name: "新年廣告",
            templateType: 1,
            // ads: [
            //     {
            //         title: "",
            //         description1: "",
            //         description2: "",
            //         actionName: "點我借款",
            //         action: "",
            //     }
            // ],
            ads: MockAdTemplate1Data.cards.map(data => {
                return {
                    title: data.title,
                    description1: data.description1,
                    description2: data.description2,
                    actionName: data.actionName,
                    action: data.action
                }
            }),
            enabled: true,
            // useRcQuota: true,
        } as DeepPartial<FormResponseData>;
    }, [])

    // NOTE: onFieldsChange
    const onFieldsChange = useCallback((changedFields, allFields) => {
        // console.log("allFields", allFields);
        // if(changedFields[0].name[0] ==="ads") {
        //     form.setFieldValue("ads", ads);
        // }
        // const ads = allFields.filter(field => field.name && field.name[0] ==="ads");
        // console.log("ads", ads);
        // ads.map(data => {
        //     return {
        //         title: data.title,
        //         description1: data.description1,
        //         description2: data.description2,
        //         actionName: data.actionName,
        //         action: data.action
        //     }
        // });
        // form.setFieldValue("ads", ads);
        const originalValues = form.getFieldValue("ads");
        console.log(form.getFieldValue("ads"))
        console.log("changedFields", changedFields);
        if(changedFields[0].name[0] === "ads") {
            const index = changedFields[0].name[1];
            const key = changedFields[0].name[2];
            const value = changedFields[0].value;
            originalValues[index][key] = value;
            console.log("originalValues", originalValues)
            form.setFieldValue("ads", originalValues);
            console.log("after", form.getFieldValue("ads"));
        }
    }, [])

    // NOTICE: Form.3 onFinish
    const onFinish = useCallback(() => {}, []);

    return (
        <div>
            <ActivityAdsForm
                form={form}
                isEdit={showModalContent.isEdit}
                id={editID}
                initialValues={initialValues}
                onFieldsChange={onFieldsChange}
                onFinish={onFinish}
                templateData={[
                    {id: 1, name: "样板1"},
                    {id: 2, name: "样板2"},
                    {id: 3, name: "样板3"},
                ]}
             />
        </div>
    )
}
