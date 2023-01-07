import React, { Component } from 'react';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from "react-intl";

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
    handleExport = () => {
        const { exportPayOrder, form: { getFieldsValue } } = this.props;
        exportPayOrder(getFieldsValue());
    }

    renderMerchants = () => {
        const { allMerchants } = this.props;
        if (!allMerchants) return;
        const ele = allMerchants.map(item => <Option key={item.merchantId} value={item.merchantId} >{item.name}</Option>);
        return [<Option value={''} key={''}><FormattedMessage id="page.search.list.no.restrict" /></Option>].concat(ele);
    }
  

    render() {
        const { allPayPlatList, allPayMchList, OrderStatus, form: { getFieldDecorator }, intl, isSuperAdmin, initTime ,btnDisabled} = this.props;
        let statusList = [];
        for(let key in OrderStatus){
            statusList.push({key:key,label:OrderStatus[key]});
        }
        // console.dir(statusList);
        return (
            <div>
                <Form>
                    <Row>
                        {isSuperAdmin && (
                            <Col lg={12} xl={8}>
                                <Form.Item {...formItemLayout} label={intl.formatMessage({ id: "page.search.list.merchantName" })}>
                                    {
                                        getFieldDecorator('dlhMerchantId', {
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
                                                return <Select.Option key={i} value={item.id}>{item.platName}</Select.Option>
                                            })}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.collection.mchNo"})}>
                                {
                                    getFieldDecorator('mchNo', {
                                        initialValue: ""
                                    })(
                                        <Input placeholder={intl.formatMessage({ id: "page.table.enter" }, { text: intl.formatMessage({id : "page.search.list.collection.mchNo"}) })}/>
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
                            <Form.Item {...formItemLayout} label={intl.formatMessage({ id: "page.table.crete.time" })}>
                                {
                                    getFieldDecorator('time', { initialValue: initTime })(
                                        <RangePicker placeholder={[intl.formatMessage({ id: "page.search.list.select" }), intl.formatMessage({ id: "page.search.list.select" })]} allowClear={true} />
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
                      
                        <Col lg={36} xl={24} style={{ textAlign: 'right' }}>
                            <Button onClick={this.handleClick} type={'primary'}><FormattedMessage id="page.search.list.search" /></Button>
                        </Col>
                        <Col lg={36} xl={24} style={{ textAlign: 'left' }}>
                            <Button type={'danger'} disabled={btnDisabled} onClick={this.handleExport}><FormattedMessage id="page.table.export" /></Button>
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