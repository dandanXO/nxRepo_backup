import { useCallback, useState } from "react";
import { ModalContent } from "../../../../../shared/components/common/AdminTable";
import { useForm } from "antd/es/form/Form";
import { CustomAntFormFieldError } from "../../../../../shared/utils/validation/CustomAntFormFieldError";
import { Modal } from "antd/es";
import { ActivityModel } from "../../../service/AdsApi";

type IUseAdminTable = {
    triggerGetList: any;
    triggerGet?: any;
    triggerDelete?: any;
    // currentFormData: any;
}
export const useAdminFormModal = (props: IUseAdminTable) => {

    // NOTICE: Action: Create or Edit
    // NOTE: Modal
    const [showModalContent, setShowModalContent] = useState<ModalContent>({
        show: false,
        isEdit: false,
    });

    // NOTICE: Form
    const [form] = useForm();

    const [editID, setEditID] = useState<number>();

    // Form - Validation
    const [customAntFormFieldError, setCustomAntFormFieldError] = useState<CustomAntFormFieldError>();

    // NOTICE: Modal - Create, Edit
    const [modal, contextHolder] = Modal.useModal();
    // Modal - OK
    const onModalOk = useCallback(() => {
        form.submit();
    }, [form]);

    // Modal - Close
    const onCloseModal = useCallback(() => {
        form.resetFields();
        setCustomAntFormFieldError({});
    }, []);

    const onAddItem = useCallback(() => {
        userAdd();
    }, []);


    // NOTE: User add ChannelSetting
    const userAdd = useCallback(() => {
        setEditID(undefined);
        setShowModalContent({
            show: true,
            isEdit: false,
        });
    }, []);


    // NOTE: User browse EditChannelSetting
    //     userBrowseEditChannelSettingUseCase
    const onEditItem = useCallback((record: ActivityModel) => {
        // triggerGetAllRiskDropMenu(null);
        // triggerGetAllChannelSettingTagDropMenu(null);

        setEditID(record.id);
        setShowModalContent({
            show: true,
            isEdit: true,
        });
        props.triggerGet({
            id: record.id,
        });
        // props.triggerGetList({
        //     id: record.id,
        // })
    }, []);

    // NOTICE: Modal - Delete
    const [showDeleteModal, setShowDeletedModal] = useState(false);

    const onDeleteModalOK = useCallback((editID: number) => {
        // NOTICE: need dependency array
        userDeleteChannelSettingUseCase(editID);
    }, []);

    // NOTE: User delete ChannelSetting
    const userDeleteChannelSettingUseCase = useCallback((editID: number) => {
        // NOTE:
        props.triggerDelete({
            id: editID,
        }).unwrap().then(() => {
            setShowDeletedModal(false);
            props.triggerGetList(null);
        });
    }, []);

    const onDeleteModalCancel = useCallback(() => {
        setShowDeletedModal(false);
    }, []);

    // userBrowseDeleteChannelSettingUseCase
    const onDeleteItem = useCallback((record: ActivityModel) => {
        modal.confirm({
            title: "确认要删除此笔数据吗?",
            // NOTICE: 得用下面寫法否則 editID 會找不到
            onOk: () => onDeleteModalOK(record.id),
            // onOk: onDeleteModalOK,
            onCancel: onDeleteModalCancel,
        });
    }, []);


    return {
        showModalContent,
        setShowModalContent,
        onModalOk,
        onCloseModal,

        modal,
        editID,
        form,
        onAddItem,
        onEditItem,
        onDeleteItem,
        contextHolder,

    };
};
