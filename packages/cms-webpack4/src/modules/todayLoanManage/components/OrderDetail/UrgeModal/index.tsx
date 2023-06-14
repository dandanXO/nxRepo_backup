import React from "react";
import {Modal} from "antd";
import {useTranslation} from "react-i18next";
import {i18nUrgeCollection} from "../../../../../i18n/urgeCollection/translations";

interface IUrgeModalProps {
    open: boolean;
    handleCloseModal: () => void
}

export const UrgeModal = ({
    open, handleCloseModal
}: IUrgeModalProps) => {
    const { t } = useTranslation(i18nUrgeCollection.namespace)
    return open && (
        <Modal
            title={t('addUrge')}
            open={open}
            onCancel={() => {
                handleCloseModal()
            }}
            maskClosable={false}
        >
            UrgeModal
        </Modal>
    )
}
