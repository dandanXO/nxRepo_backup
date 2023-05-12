import { Modal } from "antd";

interface ProductInterestRatePairsModalProps {
    show: boolean
    onOk: () => void;
    handleCloseModal: (event) => void;
}

export const ProductInterestRatePairsModal = ({ show, onOk, handleCloseModal }:ProductInterestRatePairsModalProps) => {
    return <Modal
        open={show}
        title='复贷利率'
        onOk={onOk}
        onCancel={handleCloseModal}
    >
        ProductInterestRatePairsModal
    </Modal>
}
