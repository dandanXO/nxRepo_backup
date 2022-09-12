import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, DatePicker, Row, Col, Button, Select, Input } from 'antd';
import {injectIntl, FormattedMessage} from "react-intl";

const Option = Select.Option;

const { RangePicker } = DatePicker;


const formItemLayout = {
    labelCol: {span: 7},
    wrapperCol: {span: 17},
};
class SearchList extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    submit = (e) => {
        e.preventDefault();
        const { form: { getFieldsValue }, handleSubmit } = this.props;
        handleSubmit(getFieldsValue());

    }

    render() {
        const { form: { getFieldDecorator  }, intl, initSearchParams } = this.props;
        return (
            <div>
                <Form onSubmit={this.submit}>
                    <Row gutter={40}>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.expiration.time"})}>
                                {
                                    getFieldDecorator('expiredTime', {
                                        initialValue: initSearchParams.expiredTime
                                    })(
                                        <RangePicker placeholder={[intl.formatMessage({id : "page.search.list.select"}), intl.formatMessage({id : "page.search.list.select"})]}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.repaid.time"})}>
                                {
                                    getFieldDecorator('time', {
                                        initialValue: initSearchParams.time
                                    })(
                                        <RangePicker placeholder={[intl.formatMessage({id : "page.search.list.select"}), intl.formatMessage({id : "page.search.list.select"})]}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.mobile"})}>
                                {
                                    getFieldDecorator('phoneNo', {
                                        initialValue: ''
                                    })(
                                        <Input placeholder={intl.formatMessage({id : "page.search.list.mobile.enter"})}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.name"})}>
                                {
                                    getFieldDecorator('name', {
                                        initialValue: ''
                                    })(
                                        <Input placeholder={intl.formatMessage({id : "page.search.list.name.enter"})}/>
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
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "windowPage.payment.method"})}>
                                {
                                    getFieldDecorator('payType', {
                                        initialValue: ''
                                    })(
                                        <Select>
                                            <Option value={''}><FormattedMessage id="page.search.list.no.restrict" /></Option>
                                            <Option value={'1'}><FormattedMessage id="windowPage.alipay" /></Option>
                                            <Option value={'2'}><FormattedMessage id="windowPage.lian.lian.pay" /></Option>
                                            <Option value={'3'}><FormattedMessage id="windowPage.wechat" /></Option>
                                            <Option value={'4'}><FormattedMessage id="windowPage.yeepay" /></Option>
                                            <Option value={'5'}><FormattedMessage id="windowPage.YiZhiJuhe" /></Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "windowPage.repayment.type"})}>
                                {
                                    getFieldDecorator('backType', {
                                        initialValue: ''
                                    })(
                                        <Select>
                                            <Option value={''}><FormattedMessage id="page.search.list.no.restrict" /></Option>
                                            <Option value={'1'}><FormattedMessage id="page.search.list.repayment" /></Option>
                                            <Option value={'3'}><FormattedMessage id="page.search.list.normal.repayment" /></Option>
                                            <Option value={'4'}><FormattedMessage id="page.search.list.normal.partial.repayment" /></Option>
                                            <Option value={'8'}><FormattedMessage id="windowPage.extend.repayment" /></Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        {/*<Col lg={12} xl={8}>*/}
                            {/*<Form.Item {...formItemLayout} label={"还款状态"}>*/}
                                {/*{*/}
                                    {/*getFieldDecorator('backStatus', {*/}
                                        {/*initialValue: ''*/}
                                    {/*})(*/}
                                        {/*<Select>*/}
                                            {/*<Option value={''}>不限</Option>*/}
                                            {/*<Option value={'1'}>还款成功</Option>*/}
                                            {/*<Option value={'2'}>还款失败</Option>*/}
                                        {/*</Select>*/}
                                    {/*)*/}
                                {/*}*/}
                            {/*</Form.Item>*/}
                        {/*</Col>*/}
                        <Col lg={24} xl={24}>
                            <Form.Item style={{textAlign:'right'}}>
                                <Button type={'primary'} htmlType={'submit'}><FormattedMessage id="page.search.list.search" /></Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>

        );
    }

}
SearchList.propTypes = {
    handleSubmit: PropTypes.func,
    intl: PropTypes.object.isRequired,
};
SearchList.defaultProps = {
    handleSubmit: () => {}
};

export default Form.create()(injectIntl(SearchList));