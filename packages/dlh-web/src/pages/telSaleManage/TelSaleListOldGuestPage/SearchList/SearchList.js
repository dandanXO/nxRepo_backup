import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, DatePicker, Row, Col, Button, Select, Input } from 'antd';
import {injectIntl, FormattedMessage} from "react-intl";

const Option = Select.Option;

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

    submit = (e) => {
        e.preventDefault();
        const { form: { getFieldsValue }, handleSearch } = this.props;
        handleSearch(getFieldsValue());
    }

    render() {
        const { form: { getFieldDecorator }, intl, collectors } = this.props;
        return (
            <div>
                <Form onSubmit={this.submit}>
                    <Row gutter={40}>
                        <Col lg={12} xl={6}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.distribute.time"})}>
                                {
                                    getFieldDecorator('time', {
                                        initialValue: ['','']
                                    })(
                                        <RangePicker placeholder={[intl.formatMessage({id : "page.search.list.select"}), intl.formatMessage({id : "page.search.list.select"})]}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={10} xl={4}>
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
                        <Col lg={10} xl={4}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.order.status"})}>
                                {
                                    getFieldDecorator('status', {
                                        initialValue: ''
                                    })(
                                        <Select>
                                            <Option value={''}><FormattedMessage id="page.search.list.no.restrict" /></Option>
                                            <Option value={'2'}><FormattedMessage id="page.table.not.borrowed" /></Option>
                                            <Option value={'3'}><FormattedMessage id="page.table.loaning" /></Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={10} xl={4}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({ id: "page.table.tel.sale.collector.name" })}>
                                {
                                    getFieldDecorator('collectorId', { initialValue: ''})
                                    (<Select>
                                            <Option value={''}><FormattedMessage id="page.search.list.no.restrict" /></Option>
                                            <Option value={'0'}><FormattedMessage id="page.search.unassign" /></Option>
                                            {collectors.map(i => <Option value={i.collectorId}>{i.trueName}</Option>)}
                                    </Select>)
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={8} xl={2}>
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
    params: PropTypes.object,
    intl: PropTypes.object.isRequired,
};
SearchList.defaultProps = {
    handleSubmit: () => {},
    params: {}
};

export default Form.create()(injectIntl(SearchList));
