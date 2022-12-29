import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {Modal, message, Button, Input, Tag, Tree, Checkbox} from 'antd';
import { injectIntl } from "react-intl";;
import styles from "./CollectorModal.less";
import { history, showMsg, getAdminUserInfo } from "utils";
import TreeCheckbox from "../TreeCheckbox";


function CollectorModal ({ modalTitle, collectors, visible, onModalCancel, onModalOk, intl }) {


    const [checkAllList, setCheckAllList] = useState([]);

    const onOk = () => {
        if (checkAllList.length === 0) {
            message.warning(intl.formatMessage({ id: "windowPage.select.collector" }))
            return
        }
        setCheckAllList([]);
        onModalOk(checkAllList);
    }

    const onCancel = () => {
        setCheckAllList([]);
        onModalCancel();
    }

    const onTreeCheckboxCheck = (collectors) => {
      setCheckAllList(collectors)
    }
    return (
        <Modal
            className={`${styles.urgePersonModal} collectorModal`}
            onOk={onOk}
            onCancel={onCancel}
            width={1200}
            visible={visible}
            title={intl.formatMessage({ id: modalTitle })}
        >
            <TreeCheckbox data={collectors} onCheck={onTreeCheckboxCheck}/>
        </Modal>
    );
}

CollectorModal.propTypes = {
    visible: PropTypes.bool,
    onModalCancel: PropTypes.func,
    onModalOk: PropTypes.func,
    urgePerson: PropTypes.array,  //催收人
    intl: PropTypes.object.isRequired,
};
CollectorModal.defaultProps = {
    visible: false,
    urgePerson: [],
    onModalCancel() { },
    onModalOk() { }
};
export default injectIntl(CollectorModal);
