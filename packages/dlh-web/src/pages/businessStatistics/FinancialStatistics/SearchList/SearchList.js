import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, DatePicker, Row, Col, Button } from 'antd';
import {injectIntl, FormattedMessage} from "react-intl";

const { RangePicker } = DatePicker;
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};

class SearchList extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }


    finacialReport = () => {
        const { form: { getFieldsValue }, exportFinancialRecord } = this.props;
        exportFinancialRecord(getFieldsValue());
    }

    operationReport = () => {
        const { form: { getFieldsValue }, exportOperationRecord } = this.props;
        exportOperationRecord(getFieldsValue());
    }

    render() {
        const { form: { getFieldDecorator  }, initTime, intl  } = this.props;
        return (
            <div>
                <Form onSubmit={this.submit}>
                    <Row gutter={40}>
                        <Col span={3}>
                            <Form.Item style={{textAlign:'right'}}>
                                <Button type={'danger'} style={{marginLeft:'10px'}} disabled={this.props.btnDisable} onClick={this.finacialReport}><FormattedMessage id="page.table.export.finacial" /></Button>
                           </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item style={{textAlign:'right'}}>
                                <Button type={'danger'} style={{marginLeft:'10px'}} disabled={this.props.btnDisable} onClick={this.operationReport}><FormattedMessage id="page.table.export.operation.report" /></Button>
                           </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>

        );
    }
}
SearchList.propTypes = {
    initTime: PropTypes.array,
    intl: PropTypes.object.isRequired,
};
SearchList.defaultProps = {
    handleSearch: () => {},
    initTime: []
};

export default Form.create()(injectIntl(SearchList));