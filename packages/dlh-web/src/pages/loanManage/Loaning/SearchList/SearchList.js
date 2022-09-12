import React, {Component} from 'react';
import { Form, Row, Col, Input, DatePicker, Select, Button } from 'antd';

const {RangePicker} = DatePicker;
const Option = Select.Option;

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};

class SearchList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { form: { getFieldsValue } } = this.props;
        const params = getFieldsValue();
    }
    render() {
        const {form: {getFieldDecorator}} = this.props;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Row gutter={40}>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'用户ID'}>
                                {
                                    getFieldDecorator('userId', {
                                        initialValue: ''
                                    })(
                                        <Input placehoder={'用户id'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'手机号码'}>
                                {
                                    getFieldDecorator('iphoneNumber', {
                                        initialValue: ''
                                    })(
                                        <Input placehoder={'手机号码'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'姓名'}>
                                {
                                    getFieldDecorator('username', {
                                        initialValue: ''
                                    })(
                                        <Input placehoder={'姓名'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'订单号'}>
                                {
                                    getFieldDecorator('orderNumber', {
                                        initialValue: ''
                                    })(
                                        <Input placehoder={'订单号'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'还款时间'}>
                                {
                                    getFieldDecorator('giveBackTime', {
                                        initialValue: []
                                    })(
                                        <RangePicker placeholder={['请选择', '请选择']}/>
                                    )
                                }
                            </Form.Item>
                        </Col>

                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'渠道'}>
                                {
                                    getFieldDecorator('source', {
                                        initialValue: ''
                                    })(
                                        <Select>
                                            <Option value={''}>不限</Option>
                                            <Option value={'1'}>App</Option>
                                            <Option value={'2'}>其他渠道</Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{textAlign:'right'}}>
                            <Button type="primary" htmlType="submit">查询</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default Form.create()(SearchList);