import React, { Component } from 'react';
import { Form, DatePicker, Row, Col, Button, Input, Select } from 'antd';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";

const { RangePicker } = DatePicker;


const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
class SearchList extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    handleClick = () => {
        const { handleSearch, form: { getFieldsValue } } = this.props;
        // const { visible,allPayPlatList,allPayTypeList, form: { getFieldDecorator,getFieldsValue } } = this.props;
        handleSearch(getFieldsValue());
    }

    render() {
        const { allPayPlatList,allPayMchList,OrderStatus,form: { getFieldDecorator  } , intl } = this.props;
        let statusList = [];
        for(let key in OrderStatus){
            statusList.push({key:key,label:OrderStatus[key]});
        }
        // console.dir(statusList);
        return (
            <div>
                <Form>
                    <Row>
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
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.platform.order.serial.no"})}>
                                {
                                    getFieldDecorator('platOrderId', {
                                        initialValue: ""
                                    })(
                                        <Input placeholder={intl.formatMessage({id : "page.search.list.platform.order.serial.no.enter"})}/>
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
                                        <Input placeholder={intl.formatMessage({id : "page.search.list.name.enter"})} allowClear={true} />
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "windowPage.mobile"})}>
                                {
                                    getFieldDecorator('phoneNo', {
                                        initialValue: ""
                                    })(
                                        <Input placeholder={intl.formatMessage({id : "windowPage.mobile.enter"})} allowClear={true} />
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.product.name"})}>
                                {
                                    getFieldDecorator('productName', {
                                        initialValue: ""
                                    })(
                                        <Input placeholder={intl.formatMessage({id : "page.table.product.name.enter"})} allowClear={true} />
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.repayement.platfrom"})}>
                                {
                                    getFieldDecorator('platId', {
                                        initialValue: ""
                                    })(
                                        <Select initialValue='' allowClear={true} >
                                            <Select.Option key={''} value={''}><FormattedMessage id="page.search.list.no.restrict" /></Select.Option>
                                            {allPayPlatList.length > 0 && allPayPlatList.map((item, i) => {
                                                return <Select.Option key={i} value={item.id}>{item.platName}({item.platClass})</Select.Option>
                                            })}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.business.no"})}>
                                {
                                    getFieldDecorator('mchNo', {
                                        initialValue: ""
                                    })(
                                        <Input placeholder={intl.formatMessage({id : "page.search.list.business.no.enter"})}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.payment.merchant"})}>
                                {
                                    getFieldDecorator('mchId', {
                                        initialValue: ""
                                    })(
                                        <Select initialValue=''>
                                            <Select.Option key={''} value={''}><FormattedMessage id="page.search.list.no.restrict" /></Select.Option>
                                            {allPayMchList.length > 0 && allPayMchList.map((item, i) => {
                                                return <Select.Option key={i} value={item.id}>{item.mchName}</Select.Option>
                                            })}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.status"})}>
                                {
                                    getFieldDecorator('status', {
                                        initialValue: ""
                                    })(
                                        <Select initialValue='' allowClear={true} >
                                            <Select.Option key={''} value={''}><FormattedMessage id="page.search.list.no.restrict" /></Select.Option>
                                            {statusList.length > 0 && statusList.map((item, i) => {
                                                return <Select.Option key={i} value={item.key}>{item.label}</Select.Option>
                                            })}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.table.crete.time"})}>
                                {
                                    getFieldDecorator('time', {
                                        initialValue: []
                                    })(
                                        <RangePicker placeholder={[intl.formatMessage({id : "page.search.list.select"}), intl.formatMessage({id : "page.search.list.select"})]} allowClear={true} />
                                    )
                                }
                            </Form.Item>
                        </Col>

                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.finish.time"})}>
                                {
                                    getFieldDecorator('finishTime', {
                                        initialValue: []
                                    })(
                                        <RangePicker placeholder={[intl.formatMessage({id : "page.search.list.select"}), intl.formatMessage({id : "page.search.list.select"})]} allowClear={true} />
                                    )
                                }
                            </Form.Item>
                        </Col>

                        <Col lg={36} xl={24} style={{textAlign:'right'}}>
                                <Button onClick={this.handleClick} type={'primary'}><FormattedMessage id="page.search.list.search" /></Button>
                        </Col>

                    </Row>
                </Form>
            </div>

        );
    }

}
SearchList.propTypes = {
    handleSearch: PropTypes.func,
    allPayPlatList: PropTypes.array,
    allPayMchList:PropTypes.array,
    intl: PropTypes.object.isRequired,
}
SearchList.defaultProps = {
    handleSearch() {},
    allPayPlatList: [],
    allPayMchList: []
}

export default Form.create()(injectIntl(SearchList));