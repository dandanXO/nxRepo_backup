import React, { Component } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import { CommonTable } from 'components';
import {injectIntl} from "react-intl";

class DetailModal extends Component{
    constructor(props) {
        super(props);
        this.state = {};
        this.columns = [
            { title: props.intl.formatMessage({id :"windowPage.add.time"}), dataIndex: 'addTime', key: 'addTime' },
            { title: props.intl.formatMessage({id :"page.table.designator"}), dataIndex: 'distributor', key: 'distributor' },
            { title: props.intl.formatMessage({id :"windowPage.collector"}), dataIndex: 'collector', key: 'collector' },
        ]
    }
    render() {
        const { visible, afterClose, modalData, modalLoading, handlePageChange, handleCancel, intl } = this.props;
        console.log("modalData", modalData);
        return (
            <Modal
                footer={null}
                width={1000}
                visible={visible}
                onCancel={handleCancel}
                afterClose={afterClose}
                title={intl.formatMessage({id : "windowPage.collector.record"})}>
                <div>
                    <CommonTable
                        columns={this.columns}
                        loading={modalLoading}
                        // pagination={pagination}
                        dataSource={modalData}
                        // pageSize={10}
                        // handlePageChange={handlePageChange}
                    />
                </div>
            </Modal>
        );
    }

}

DetailModal.propTypes = {
    visible: PropTypes.bool,
    modalData: PropTypes.object,
    modalLoading: PropTypes.bool,
    afterClose: PropTypes.func,
    handlePageChange: PropTypes.func,
    handleCancel: PropTypes.func,
    intl: PropTypes.object.isRequired,
};

DetailModal.defaultProps = {
    visible: false,
    modalData: {},
    modalLoading: false,
    afterClose() {
    },
    handlePageChange() {
    },
    handleCancel() {

    }
};
export default injectIntl(DetailModal);
