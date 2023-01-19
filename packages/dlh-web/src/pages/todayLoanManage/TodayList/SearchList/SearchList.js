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
        const { form: { getFieldsValue }, handleSubmit  } = this.props;
        handleSubmit(getFieldsValue());

    }
    renderPerson = () => {
        const { personData } = this.props;
        const ele = personData.map(item => <Option value={item.value} key={item.value} >{item.name}</Option>)
        return [<Option value={''} key={''} ><FormattedMessage id="page.search.list.no.restrict" /></Option>].concat(ele);
    }

    handleExport = (e) => {
        e.preventDefault();
        const { form: { getFieldsValue }, exportRecord } = this.props;
        exportRecord(getFieldsValue());
    }


    render() {
        const { form: { getFieldDecorator  }, intl ,productSelect,distributeOrder ,btnDisabled } = this.props;
        return (
            <div>
                <Form onSubmit={this.submit}>
                    <Row gutter={40}>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.expiration.time"})}>
                                {
                                    getFieldDecorator('time', {
                                        initialValue: []
                                    })(
                                        <RangePicker placeholder={[intl.formatMessage({id : "page.search.list.select"}), intl.formatMessage({id : "page.search.list.select"})]}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.distribute.time"})}>
                                {
                                    getFieldDecorator('disTime', {
                                        initialValue: []
                                    })(
                                        <RangePicker placeholder={[intl.formatMessage({id : "page.search.list.select"}), intl.formatMessage({id : "page.search.list.select"})]}/>
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
                            <Form.Item {...formItemLayout} label={intl.formatMessage({ id: "page.table.appName" })}>
                                {
                                    getFieldDecorator('appName', {
                                        initialValue: ''
                                    })(
                                        <Input placeholder={intl.formatMessage({ id: "page.table.enter" }, { text: intl.formatMessage({ id: "page.table.appName" }) })} />
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({ id: "page.search.list.product.name" })}>
                                {
                                    getFieldDecorator('productId', {
                                        initialValue: ''
                                    })(
                                        <Select>
                                            <Option value={''}><FormattedMessage id="page.search.list.no.restrict" /></Option>
                                            {productSelect.map(i => <Option value={i.productId} key={i.productId}>{i.productName}</Option>)}
                                        </Select>
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
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.name"})}>
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
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.order.status"})}>
                                {
                                    getFieldDecorator('status', {
                                        initialValue: ''
                                    })(
                                        <Select>
                                            <Option value={''}><FormattedMessage id="page.search.list.no.restrict" /></Option>
                                            <Option value={'0'}><FormattedMessage id="page.search.list.repaymenting" /></Option>
                                            <Option value={'1'}><FormattedMessage id="windowPage.cleared" /></Option>
                                            <Option value={'3'}><FormattedMessage id="page.search.list.partial.repaid" /></Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id :   "page.table.overdue.stage"})}>
                                {
                                    getFieldDecorator('stage', { initialValue: '' })(
                                        <Select>
                                            <Option value={''}><FormattedMessage id="page.search.list.no.restrict" /></Option>
                                            <Option value={'T_1'}>T-1</Option>
                                            <Option value={'T0'}>T0</Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.table.collector.group"})}>
                                {
                                    getFieldDecorator('collectorId', {
                                        initialValue: ''
                                    })(
                                        <Select>
                                            {this.renderPerson()}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item style={{textAlign:'right'}}>
                                <Button type={'primary'} htmlType={'submit'}><FormattedMessage id="page.search.list.search" /></Button>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item style={{ textAlign: 'left' }}>
                                <Button style={{ marginRight: '5px' }} type={'primary'} onClick={distributeOrder}><FormattedMessage id="page.table.redistribute.order" /></Button>
                                <Button type={'danger'} disabled={btnDisabled} onClick={this.handleExport}><FormattedMessage id="page.table.export.record" /></Button>
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
    personData: PropTypes.array,
    intl: PropTypes.object.isRequired,
};
SearchList.defaultProps = {
    handleSubmit: () => {},
    params: {},
    personData: []
};

export default Form.create({
    mapPropsToFields(props){
        const { params } = props;
        return {
            time: Form.createFormField({
                value: params['time'] || []
            }),
            disTime: Form.createFormField({
                value: params['disTime'] || []
            }),
            orderNo: Form.createFormField({
                value: params['orderNo'] || ''
            }),
            appName: Form.createFormField({
                value: params['appName'] || ''
            }),
            productId: Form.createFormField({
                value: params['productId'] || ''
            }),
            userPhone: Form.createFormField({
                value: params['userPhone'] || ''
            }),
            userTrueName: Form.createFormField({
                value: params['userTrueName'] || ''
            }),
            status: Form.createFormField({
                value: params['status'] || ''
            }),
            stage: Form.createFormField({
                value: params['stage'] || ''
            }),
            collectorId: Form.createFormField({
                value: params['collectorId'] || ''
            })
        }
    }
})(injectIntl(SearchList));