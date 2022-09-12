import React, { Component } from 'react';
import { Form, DatePicker, Row,Select, Col, Button, Input } from 'antd';
import PropTypes from 'prop-types';
const { RangePicker } = DatePicker;
const Option = Select.Option;


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
        handleSearch(getFieldsValue());
    }

    render() {
        const { form: { getFieldDecorator  }  } = this.props;
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
                                        <Input placehoder={'请输入订单号'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'平台订单号'}>
                                {
                                    getFieldDecorator('platNo', {
                                        initialValue: ""
                                    })(
                                        <Input placehoder={'请输入平台订单号'}/>
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
                                        <Input placehoder={'请输入商户号'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'平台名称'}>
                                {
                                    getFieldDecorator('platName', {
                                        initialValue: ""
                                    })(
                                        <Input placehoder={'请输入平台名称'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'商户名称'}>
                                {
                                    getFieldDecorator('mchName', {
                                        initialValue: ""
                                    })(
                                        <Input placehoder={'请输入商户名称'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>

                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'资金类型'}>
                                {
                                    getFieldDecorator('assetType', {
                                        initialValue: ''
                                    })(
                                        <Select>
                                            <Option value={''}>不限</Option>
                                            <Option value={'P'}>收入</Option>
                                            <Option value={'L'}>支出</Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={"发起时间"}>
                                {
                                    getFieldDecorator('createTime', {
                                        initialValue: []
                                    })(
                                        <RangePicker placeholder={['请选择', '请选择']}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={"完成时间"}>
                                {
                                    getFieldDecorator('finishTime', {
                                        initialValue: []
                                    })(
                                        <RangePicker placeholder={['请选择', '请选择']}/>
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
    handleSearch: PropTypes.func
}
SearchList.defaultProps = {
    handleSearch() {}
}

export default Form.create()(SearchList);