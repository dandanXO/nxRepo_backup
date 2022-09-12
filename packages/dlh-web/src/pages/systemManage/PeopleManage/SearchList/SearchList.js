import React, {Component} from 'react';
import { Form, Row, Col, Input, DatePicker, Select, Button } from 'antd';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";

const {RangePicker} = DatePicker;
const Option = Select.Option;
import { orderStatus } from 'utils';
const formItemLayout = {
    labelCol: {span: 7},
    wrapperCol: {span: 17},
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

    renderDepartment = () => {
        const { departmentData } = this.props;
        const ele = departmentData.map(item => <Option key={item.id} value={item.id} >{item.name}</Option>);
        return [<Option value={''} key={''}><FormattedMessage id="page.search.list.no.restrict" /></Option>].concat(ele);
    }

    renderRole = () => {
        const { roleData } = this.props;
        const ele = roleData.map(item => <Option key={item.id} value={item.id} >{item.name}</Option>);
        return [<Option value={''} key={''}><FormattedMessage id="page.search.list.no.restrict" /></Option>].concat(ele);
    }


    render() {
        const {form: {getFieldDecorator}, intl} = this.props;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.name"})}>
                                {
                                    getFieldDecorator('trueName', {
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
                                    getFieldDecorator('phoneNo', {
                                        initialValue: ''
                                    })(
                                        <Input placeholder={intl.formatMessage({id : "page.search.list.mobile.enter"})}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.account"})}>
                                {
                                    getFieldDecorator('userName', {
                                        initialValue: ''
                                    })(
                                        <Input placeholder={intl.formatMessage({id : "page.search.list.account.enter"})}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.table.department"})}>
                                {
                                    getFieldDecorator('departmentId', {
                                        initialValue: ''
                                    })(
                                        <Select>
                                            {this.renderDepartment()}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.roles"})}>
                                {
                                    getFieldDecorator('roleId', {
                                        initialValue: ''
                                    })(
                                        <Select>
                                            {this.renderRole()}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.status"})}>
                                {
                                    getFieldDecorator('enabled', {
                                        initialValue: ''
                                    })(
                                        <Select>
                                            <Option value={''}><FormattedMessage id="page.search.list.no.restrict" />(<FormattedMessage id="page.search.list.default.display.normal" />)</Option>
                                            <Option value={'1'}><FormattedMessage id="page.search.list.normal" /></Option>
                                            <Option value={'0'}><FormattedMessage id="page.search.list.freeze" /></Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>

                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.google.auth"})}>
                                {
                                    getFieldDecorator('googleAuthFlag', {
                                        initialValue: ''
                                    })(
                                        <Select>
                                            <Option value={''}><FormattedMessage id="page.search.list.no.restrict" />(<FormattedMessage id="page.search.list.default.display.normal" />)</Option>
                                            <Option value={'1'}><FormattedMessage id="page.table.enabled" /></Option>
                                            <Option value={'0'}><FormattedMessage id="page.search.list.disable" /></Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>

                        <Col span={24} style={{textAlign:'right'}}>
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
    departmentData: PropTypes.array,
    roleData: PropTypes.array,
    intl: PropTypes.object.isRequired,
};
SearchList.defaultProps = {
    submit: () => {

    },
    departmentData: [],
    roleData: []
}

export default Form.create()(injectIntl(SearchList));