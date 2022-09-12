import React, {Component} from 'react';
import { Form, Row, Col, Input, DatePicker, Select, Button } from 'antd';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";

const {RangePicker} = DatePicker;
const Option = Select.Option;
import { checkRecordStatus } from 'utils';
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};

class SearchList extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    submit = (e) => {
        e.preventDefault();
        const { handleSearch, form: { getFieldsValue } } = this.props;
        handleSearch(getFieldsValue());

    }
    renderStatus = () => {
        const arr = Object.keys(checkRecordStatus);
        const ele = arr.map((item, index) => <Option value={item} key={index}>{checkRecordStatus[item]}</Option>)
        return [ <Option value={''} key={''}><FormattedMessage id="page.search.list.no.restrict"/></Option> ].concat(ele);
    }

    renderOperator = () => {
        const { operatorData } = this.props;
        const ele = operatorData.map((item, index) => <Option value={item.id + ''} key={index}>{item.trueName}</Option>);
        return [<Option value={''} key={''}><FormattedMessage id="page.search.list.no.restrict"/></Option>].concat(ele);
    }

    render() {
        const { form: { getFieldDecorator }, initTime, intl } = this.props;
        return (
            <div>
                <Form onSubmit={this.submit}>
                    <Row>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.table.exam.time"})}>
                                {
                                    getFieldDecorator('time', {
                                        initialValue: initTime

                                    })(
                                        <RangePicker placeholder={[intl.formatMessage({id : "page.search.list.select"}), intl.formatMessage({id : "page.search.list.select"})]}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.mobile"})}>
                                {
                                    getFieldDecorator('userPhone', {
                                        initialValue: ""
                                    })(
                                        <Input placeholder={intl.formatMessage({id : "page.search.list.mobile.enter"})}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.name"})}>
                                {
                                    getFieldDecorator('userName', {
                                        initialValue: ""
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
                                        initialValue: ""
                                    })(
                                        <Input placeholder={intl.formatMessage({id : "page.search.list.order.no.enter"})}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.table.exam.status"})}>
                                {
                                    getFieldDecorator('reviewStatus', {
                                        initialValue: ''
                                    })(
                                        <Select>
                                            {this.renderStatus()}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.table.operation.person"})}>
                                {
                                    getFieldDecorator('operatorId', {
                                        initialValue: ""
                                    })(
                                        <Select>
                                            {this.renderOperator()}
                                        </Select>
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
    handleSearch: PropTypes.func,
    operatorData: PropTypes.array,
    initTime: PropTypes.array,
    intl: PropTypes.object.isRequired,
};
SearchList.defaultProps = {
    handleSearch: () => {},
    operatorData: [],
    initTime: []
};

export default Form.create()(injectIntl(SearchList));