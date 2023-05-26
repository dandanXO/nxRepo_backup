import { CustomAntFormFieldError } from '../../../../../shared/utils/validation/CustomAntFormFieldError';
import { ChannelTagSchemaEntity, IChannelTagSchema } from '../../../../domain/entity/ChannelTagSchemaEntity';
import { FormInstance } from 'antd';
import { useCallback, useMemo, useState } from 'react';

export interface FormModalHookProps {
    showModalContent: {
        isEdit: boolean;
        show: boolean;
    };
    setShowModalContent: (any) => void;
    editID: number;
    form: FormInstance;
    triggerGetList?: (any) => void;
    triggerPost: (any) => void;
    triggerPut: (any) => void;
    formSuccessCallback?: () => void;
}

export const useFormModal = (
    props: FormModalHookProps,
): {
    formInitialValues: Record<any, any>;
    onFormFieldsChange: (changedFields: any) => void;
    onFormFinish: () => void;
    customAntFormFieldError: CustomAntFormFieldError;
    onModalOk: () => void;
    onCloseModal: () => void;
} => {
    // NOTICE:
    const channelTagSchemaEntity = new ChannelTagSchemaEntity();

    // Form - Initial Data
    const formInitialValues = useMemo(() => {
        // NOTE: select and switch need initialValue if you want to select one
        return {} as Record<any, any>;
    }, []);

    // Form - onFieldsChange
    const onFormFieldsChange = useCallback((changedFields) => {
        userEditingChannelSettingUseCase(changedFields);
    }, []);

    // Form - Validation
    const [customAntFormFieldError, setCustomAntFormFieldError] = useState<CustomAntFormFieldError>();

    // NOTE: User is editing ChannelSetting
    const userEditingChannelSettingUseCase = useCallback((changedFields) => {
        if (changedFields.length === 0) return;

        // NOTICE: need
        const changedFieldName = changedFields[0].name[0];

        // NOTICE: need
        const sourceData: IChannelTagSchema = {
            [changedFields[0].name[0]]: changedFields[0].value,
        } as IChannelTagSchema;

        // NOTICE: need
        const data = channelTagSchemaEntity.transformToEntityData(sourceData);
        const validData = channelTagSchemaEntity.setProperties(data).validate(changedFieldName);

        setCustomAntFormFieldError({
            ...customAntFormFieldError,
            ...validData.fieldsMessage,
        });
    }, []);

    // Form - Finish
    const onFormFinish = useCallback(() => {
        userEditedChannelSettingUseCase();
    }, [props.showModalContent.isEdit, props.editID]);

    // NOTE: user Edited ChannelSetting
    const userEditedChannelSettingUseCase = useCallback(() => {
        const isValid = systemValidateChannelSettingUseCase();
        if (!isValid) return;

        // NOTICE: need
        const fields = props.form.getFieldsValue();

        // NOTICE: MODE - Edit
        if (props.showModalContent.isEdit) {
            fields['id'] = props.editID;
        }

        // NOTE: Create or Edit
        const triggerAPI = (!props.showModalContent.isEdit ? props.triggerPost : props.triggerPut) as any;

        // NOTE: Request
        triggerAPI(fields)
            .unwrap()
            .then(() => {
                // console.log("responseData", responseData);

                // Reset Form
                props.form.resetFields();

                // Close Modal
                props.setShowModalContent({
                    show: false,
                    isEdit: false,
                });

                // Reset TableList
                props.triggerGetList && props.triggerGetList(null);

                props.formSuccessCallback && props.formSuccessCallback();
            });
    }, [props.showModalContent.isEdit, props.editID]);

    // NOTE: System validate ChannelSetting
    const systemValidateChannelSettingUseCase = useCallback(() => {
        // NOTICE: need
        const fields = props.form.getFieldsValue();

        // NOTICE: need to prevent restored validation
        Object.keys(fields).map((key) => {
            if (fields[key] === undefined) {
                props.form.setFieldValue(key, '');
            }
        });

        // NOTICE: need
        const data = channelTagSchemaEntity.transformToEntityData(fields);
        const validData = channelTagSchemaEntity.setProperties(data).validate();

        setCustomAntFormFieldError({
            ...customAntFormFieldError,
            ...validData.fieldsMessage,
        });
        return validData.isEntityValid;
    }, []);

    // NOTICE: Modal - Create, Edit
    // Modal - OK
    const onModalOk = useCallback(() => {
        props.form.submit();
    }, [props.form]);

    // Modal - Close
    const onCloseModal = useCallback(() => {
        props.form.resetFields();
        setCustomAntFormFieldError({});
    }, []);

    return {
        // form
        formInitialValues,
        onFormFieldsChange,
        onFormFinish,
        customAntFormFieldError,
        // modal
        onModalOk,
        onCloseModal,
    };
};
