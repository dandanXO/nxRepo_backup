import React, {Component} from 'react';
import { Form, Row, Col, Input, DatePicker, Select, Button } from 'antd';
import PropTypes from 'prop-types';
const {RangePicker} = DatePicker;
const Option = Select.Option;
import { orderStatus } from 'utils';
import {injectIntl, FormattedMessage} from "react-intl";

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};

class SearchList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { form: { getFieldsValue }, submit } = this.props;
        const params = getFieldsValue();
        submit(params);
    }
    renderMerchants = () => {
      const { allMerchants } = this.props;
      if(!allMerchants) return;
      const ele = allMerchants.map(item => <Option key={item.merchantId} value={item.merchantId} >{item.name}</Option>);
      return [<Option value={''} key={''}><FormattedMessage id="page.search.list.no.restrict" /></Option>].concat(ele);
    }
    render() {
        const {form: {getFieldDecorator}, intl, isSuperAdmin} = this.props;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        {isSuperAdmin && (
                          <Col lg={12} xl={8}>
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
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id :"page.search.list.name"})}>
                                {
                                    getFieldDecorator('userTrueName', {
                                        initialValue: ''
                                    })(
                                        <Input placeholder={intl.formatMessage({id : "page.search.list.name.enter"})}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.mobile"})}>
                                {
                                    getFieldDecorator('userPhone', {
                                        initialValue: ''
                                    })(
                                        <Input placeholder={intl.formatMessage({id : "page.search.list.mobile.enter"})}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.order.no"})}>
                                {
                                    getFieldDecorator('orderNo', {
                                        initialValue: ''
                                    })(
                                        <Input placeholder={intl.formatMessage({id : "page.search.list.order.no.enter"})}/>
                                    )
                                }
                            </Form.Item>
                        </Col>

                        <Col lg={24} xl={24} style={{textAlign:'right'}}>
                            <Button type="primary" htmlType="submit"><FormattedMessage id="page.search.list.search" /></Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

SearchList.propTypes = {
    submit: PropTypes.func,
    intl: PropTypes.object.isRequired,
};
SearchList.defaultProps = {
    submit: () => {

    }
}

export default Form.create()(injectIntl(SearchList));
