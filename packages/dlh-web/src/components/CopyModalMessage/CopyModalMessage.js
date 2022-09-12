import React, { useEffect, useState } from 'react';
import { Form, Modal,Icon,Button,message } from 'antd';
import { injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import styles from "./CopyModalMessage.less";
import CopyText from '../CopyText/CopyText';
import { CopyToClipboard } from 'react-copy-to-clipboard';


function CopyModalMessage({ intl,visible, title, onOk, onCancel, message, messageTitle,copyText }) {

console.log(copyText)
const handleCopy = () => {
    message.success(intl.formatMessage({ id: "page.table.copy.success" }), 2);
}
    return (
        <div className={styles.copyModalMessage}>
            <Modal
                onOk={onOk}
                onCancel={onCancel}
                visible={visible}
                title={title}
                footer={[
                    <CopyToClipboard text={copyText} onCopy={handleCopy}>
                        <Button >{intl.formatMessage({ id: "page.table.copy" })}</Button>
                    </CopyToClipboard>
                    ,
                    <Button onClick={onCancel}>{intl.formatMessage({ id: "page.table.cancel" })}</Button>,
                ]}
            >
                <div className={styles.title}><Icon type="info-circle" />{messageTitle}</div>
                <div className={styles.content}>
                    <CopyText text={message} acturalCopy={copyText} />
                </div>
            </Modal>
        </div>
    )
}
CopyModalMessage.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default injectIntl(CopyModalMessage);
