import React, {useCallback, useMemo, useState} from "react";
import {ActivityAdsForm} from "./ActivityAdsForm";
import {useForm} from "antd/es/form/Form";
import {ModalContent} from "../../../../shared/components/AdminTable";
import {MockAdTemplate1Data} from "../../../import/ActivityAdListPage/MockAdTemplate1Data";
import {IActivityAdsPageFormStore} from "../../../types/IAdsFormStore";
import {AdsTemplateData} from "../../../data/AdsTemplateData";
import {MockActivityBannerResponseData1} from "../../../service/mock/MockActivityBannerResponseData1";
import {MockActivityBannerResponseData2} from "../../../service/mock/MockActivityBannerResponseData2";
import {MockActivityBannerResponseData3} from "../../../service/mock/MockActivityBannerResponseData3";

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

interface IActivityAdsPage {
    formStore: IActivityAdsPageFormStore;
}

// const FormStore: DeepPartial<IAdsFormStore> = {
//     name: "新年廣告",
//     templateType: 1,
//     ads: MockAdTemplate1Data.cards.map(data => {
//         return {
//             title: data.title,
//             description1: data.description1,
//             description2: data.description2,
//             actionName: data.actionName,
//             action: data.action
//         }
//     }),
//     enabled: true,
// };

// const MockFormStore = MockActivityBannerResponseData1;
// const MockFormStore = MockActivityBannerResponseData2;
const MockFormStore = MockActivityBannerResponseData3;

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
    // const initialValues = useMemo(() => {
    //     // NOTICE: select and switch need initialValue if you want to select one
    //     return {
    //         name: "新年廣告",
    //         templateType: 1,
    //         ads: MockAdTemplate1Data.cards.map(data => {
    //             return {
    //                 title: data.title,
    //                 description1: data.description1,
    //                 description2: data.description2,
    //                 actionName: data.actionName,
    //                 action: data.action
    //             }
    //         }),
    //         enabled: true,
    //     } as DeepPartial<IAdsFormStore>;
    // }, [])
    //
    const initialValues = MockFormStore;

    // NOTE: onFieldsChange
    const onFieldsChange = useCallback((changedFields, allFields) => {
        // NOTICE: change form field value
        const originalValues = form.getFieldValue("ads");
        // console.log(form.getFieldValue("ads"))
        // console.log("changedFields", changedFields);

        // NOTE: Template1
        if(changedFields[0].name[0] === "ads") {
            const index = changedFields[0].name[1];
            const key = changedFields[0].name[2];
            const value = changedFields[0].value;
            originalValues[index][key] = value;
            // console.log("originalValues", originalValues)
            form.setFieldValue("ads", originalValues);
            // console.log("after", form.getFieldValue("ads"));
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
                templateData={AdsTemplateData}
             />
        </div>
    )
}
