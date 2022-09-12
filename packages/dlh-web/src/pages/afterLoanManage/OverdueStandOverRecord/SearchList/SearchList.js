import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, DatePicker, Row, Col, Button, Select, Input } from 'antd';
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

    render() {
        const { form: { getFieldDecorator  }  } = this.props;
        return (
            <div>
                <Form onSubmit={this.submit}>
                    <Row gutter={40}>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={"还款时间"}>
                                {
                                    getFieldDecorator('time', {
                                        initialValue: []
                                    })(
                                        <RangePicker placeholder={['请选择', '请选择']}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={"手机号"}>
                                {
                                    getFieldDecorator('phoneNo', {
                                        initialValue: ''
                                    })(
                                        <Input placeholder={'请输入手机号'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={"姓名"}>
                                {
                                    getFieldDecorator('name', {
                                        initialValue: ''
                                    })(
                                        <Input placeholder={'请输入姓名'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={"订单号"}>
                                {
                                    getFieldDecorator('orderNo', {
                                        initialValue: ''
                                    })(
                                        <Input placeholder={'请输入订单号'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={24} xl={16}>
                            <Form.Item style={{textAlign:'right'}}>
                                <Button type={'primary'} htmlType={'submit'}>查询</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>

        );
    }

}
SearchList.propTypes = {
    handleSubmit: PropTypes.func
};
SearchList.defaultProps = {
    handleSubmit: () => {}
};

export default Form.create()(SearchList);