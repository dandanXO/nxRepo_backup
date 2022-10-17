import {Modal, ModalFuncProps} from 'antd';
import {useEffect, useState} from "react";

const { confirm, error } = Modal;

const useErrorModal = (prefixCls: string) => {
    const [modalState, setModalState] = useState<ReturnType<typeof error> | null>(null);

    useEffect(() => modalState?.update({}), [prefixCls]);

    return (props: ModalFuncProps) => setModalState(error(props));
};
export default useErrorModal;
