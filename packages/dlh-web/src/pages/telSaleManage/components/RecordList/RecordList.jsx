import React, { useEffect, useState } from 'react';
import { Form, Modal, message, Button, Col,Row } from 'antd';
import { injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CommonTable, FormItems, CopyText } from 'components';
const { FormItem } = FormItems;
function RecordList ({
    intl,
    form,
    recordList: { data, pagination },
    handleAddRecord,
    handlePageChange,
}) {
    const columns = [
        { title: intl.formatMessage({ id: "page.table.tel.sale.collector.name" }), dataIndex: "collectorName", key: "collectorName", render (text) { return <CopyText text={text} />; } },
        { title: intl.formatMessage({ id: "page.table.tel.sale.remark" }), dataIndex: "remark", key: "remark", render (text) { return <CopyText text={text} />; } },
        { title: intl.formatMessage({ id: "page.table.tel.sale.createTime" }), dataIndex: "addTime", key: "addTime" },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const { getFieldsValue } = form;
        const { remark } = getFieldsValue();
        remark === ""
            ? message.warning(intl.formatMessage({ id: `windowPage.input.remarks` }))
            : handleAddRecord(getFieldsValue(),form);
    };

    const renderForm = () => {
        const layout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 22 },
        };
        const formItems = [
            { type: "textarea", field: "remark", label: "page.table.tel.sale.remark", placeholder: "windowPage.input.remarks", minRows: 1.5 },
        ];
        return formItems.map((item) => <FormItem key={item.field} layout={layout} {...item} form={form} />);
    };

    return (
        <div>
            <Row style={{ marginTop: "16px" }}>
                <Form>
                    <Col span={12}>{renderForm()}</Col>
                    <Col span={4}>
                        <Form.Item style={{ marginLeft: "16px" }}>
                            <Button type={"primary"} onClick={handleSubmit}>{intl.formatMessage({ id: "page.table.add" })}</Button>
                        </Form.Item>
                    </Col>
                </Form>
            </Row>
            <Row>
                <CommonTable
                    rowKey={(record, index) => index}
                    columns={columns}
                    handlePageChange={handlePageChange}
                    dataSource={data}
                    pagination={pagination}
                />
            </Row>
        </div>
    );
}

RecordList.propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    intl: PropTypes.object.isRequired,
};
RecordList.defaultProps = {
    visible: false,
    handleOk: () => {
    },
    handleCancel: () => {
    },

};

export default Form.create()(injectIntl(RecordList));
