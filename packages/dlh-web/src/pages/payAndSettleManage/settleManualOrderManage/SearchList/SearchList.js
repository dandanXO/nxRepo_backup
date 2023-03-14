import React, { Component } from 'react';
import { Form, DatePicker, Row, Col, Button, Input, Select } from 'antd';
import PropTypes from 'prop-types';
const { RangePicker } = DatePicker;


const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};
class SearchList extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    handleClick = () => {
        const { handleSearch, form: { getFieldsValue } } = this.props;
        // const { visible,allSettlePlatList,allSettleTypeList, form: { getFieldDecorator,getFieldsValue } } = this.props;
        handleSearch(getFieldsValue());
    }

    render() {
        const { allSettlePlatList,allSettleMchList,OrderStatus,form: { getFieldDecorator  }  } = this.props;
        let statusList = [];
        statusList.push({key:null,label:'请选择'});
        for(let key in OrderStatus){
            statusList.push({key:key,label:OrderStatus[key]});
        }
        // console.dir(statusList);
        return (
            <div>
                <Form>
                    <Row>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'订单号'}>
                                {
                                    getFieldDecorator('orderNo', {
                                        initialValue: ""
                                    })(
                                        <Input placehoder={'请输入订单号'} allowClear={true} />
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'平台订单流水号'}>
                                {
                                    getFieldDecorator('platOrderId', {
                                        initialValue: ""
                                    })(
                                        <Input placehoder={'请输入平台订单流水号'} allowClear={true} />
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'姓名'}>
                                {
                                    getFieldDecorator('bankAccountName', {
                                        initialValue: ""
                                    })(
                                        <Input placehoder={'请输入姓名'} allowClear={true} />
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'手机号码'}>
                                {
                                    getFieldDecorator('phoneNo', {
                                        initialValue: ""
                                    })(
                                        <Input placehoder={'手机号码'} allowClear={true} />
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'代收平台'}>
                                {
                                    getFieldDecorator('platId', {
                                        initialValue: ""
                                    })(
                                        <Select initialValue='' allowClear={true} >
                                            <Select.Option key={''} value={''}>不限</Select.Option>
                                            {allSettlePlatList.length > 0 && allSettlePlatList.map((item, i) => {
                                                return <Select.Option key={i} value={item.id}>{item.platName}({item.platClass})</Select.Option>
                                            })}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'商户号'}>
                                {
                                    getFieldDecorator('mchNo', {
                                        initialValue: ""
                                    })(
                                        <Input placehoder={'请输入商户号'} allowClear={true} />
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'代收商户'}>
                                {
                                    getFieldDecorator('mchId', {
                                        initialValue: ""
                                    })(
                                        <Select initialValue='' allowClear={true} >
                                            <Select.Option key={''} value={''}>不限</Select.Option>
                                            {allSettleMchList.length > 0 && allSettleMchList.map((item, i) => {
                                                return <Select.Option key={i} value={item.id}>{item.mchName}</Select.Option>
                                            })}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'状态'} >
                                {
                                    getFieldDecorator('status', {
                                        initialValue: ""
                                    })(
                                        <Select initialValue='' allowClear={true}>
                                            <Select.Option key={''} value={''}>不限</Select.Option>
                                            {statusList.length > 0 && statusList.map((item, i) => {
                                                return <Select.Option key={i} value={item.key}>{item.label}</Select.Option>
                                            })}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={"创建时间"}>
                                {
                                    getFieldDecorator('time', {
                                        initialValue: []
                                    })(
                                        <RangePicker placeholder={['请选择', '请选择']} allowClear={true} />
                                    )
                                }
                            </Form.Item>
                        </Col>

                        <Col lg={36} xl={24} style={{textAlign:'right'}}>
                                <Button onClick={this.handleClick} type={'primary'}>查询</Button>
                        </Col>

                    </Row>
                </Form>
            </div>

        );
    }

}
SearchList.propTypes = {
    handleSearch: PropTypes.func,
    allSettlePlatList: PropTypes.array,
    allSettleMchList:PropTypes.array
}
SearchList.defaultProps = {
    handleSearch() {},
    allSettlePlatList: [],
    allSettleMchList: []
}

export default Form.create()(SearchList);