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
        const { form: { getFieldsValue }, handleSubmit } = this.props;
        handleSubmit(getFieldsValue());

    }
    renderPerson = () => {
        const { personData } = this.props;
        const ele = personData.map(item => <Option value={item.value} key={item.value} >{item.name}</Option>)
        return [<Option value={''} key={''} ><FormattedMessage id="page.search.list.no.restrict" /></Option>].concat(ele);
    }


    render() {
        const { form: { getFieldDecorator  }, intl ,isSuperAdmin } = this.props;
        return (
            <div>
                <Form onSubmit={this.submit}>
                    <Row gutter={40}>
                         {/* <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={"分配时间"}>
                                {
                                    getFieldDecorator('time', {
                                        initialValue: []
                                    })(
                                        <RangePicker placeholder={['请选择', '请选择']}/>
                                    )
                                }
                            </Form.Item>
                        </Col> */}
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
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.order.status"})}>
                                {
                                    getFieldDecorator('orderStatus', {
                                        initialValue: ''
                                    })(
                                        <Select>
                                            <Option value={''}><FormattedMessage id="page.search.list.no.restrict" /></Option>
                                            <Option value={'0'}><FormattedMessage id="page.search.list.outstanding" /></Option>
                                            <Option value={'1'}><FormattedMessage id="page.search.list.repaid" /></Option>
                                            <Option value={'3'}><FormattedMessage id="page.search.list.partial.repaid" /></Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.table.collector.group"})}>
                                {
                                    getFieldDecorator('person', {
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
            phoneNo: Form.createFormField({
                value: params['phoneNo'] || ''
            }),
            name: Form.createFormField({
                value: params['name'] || ''
            }),
            orderNo: Form.createFormField({
                value: params['orderNo'] || ''
            }),
            orderStatus: Form.createFormField({
                value: params['orderStatus'] || ''
            }),
            person: Form.createFormField({
                value: params['person']
            })
        }
    }
})(injectIntl(SearchList));