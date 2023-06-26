export interface FormModalProps {
    showModal?: boolean;
    setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
    isEdit?: boolean;
    setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
    onFinish?: any;
    form?: any;
    isSuccess?: boolean;
}
