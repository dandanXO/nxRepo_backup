import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Form, DatePicker, Row, Col, Button, Select} from 'antd';
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

    renderMerchants = () => {
      const { allMerchants } = this.props
      if(!allMerchants) return;
      const ele = allMerchants.map(item => <Select.Option key={item.merchantId} value={item.merchantId} >{item.name}</Select.Option>);
      return [<Select.Option key={'merchantIdOption'} value=""><FormattedMessage id="page.search.list.select" /></Select.Option>].concat(ele)
    }
    render() {
        const { form: { getFieldDecorator  }, initTime, intl, isSuperAdmin, allMerchants  } = this.props;
        // console.log(initTime)
        return (
            <div>
                <Form onSubmit={this.submit}>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        {isSuperAdmin && (
                          <Col span={6}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.merchantName"})}>
                              {
                                getFieldDecorator('merchantId', {
                                  initialValue: ''
                                })(
                                  <Select>
                                    {this.renderMerchants()}
                                  </Select>
                                )
                              }
                            </Form.Item>
                          </Col>
                        )}
                        <Col span={6}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({ id: "page.table.date" })}>
                                {
                                    getFieldDecorator('time', { initialValue: initTime})(
                                        <DatePicker  placeholder={intl.formatMessage({ id: "page.search.list.select" })} />
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={18} style={{ display: 'flex' }}>
                            <Form.Item style={{ marginRight: '10px' }}>
                                <Button type={'danger'} disabled={this.props.btnDisable} onClick={this.finacialReport}><FormattedMessage id="page.table.export.finacial" /></Button>
                            </Form.Item>
                            <Form.Item style={{ marginRight: '10px' }}>
                                <Button type={'danger'} disabled={this.props.btnDisable} onClick={this.operationReport}><FormattedMessage id="page.table.export.operation.report" /></Button>
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
