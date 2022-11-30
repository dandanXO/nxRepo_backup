export interface FormModalProps {
    showModal?: boolean;
    setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
    handleCloseModal?: () => void;
    onFinish?: any;
    form?: any;
   
}


