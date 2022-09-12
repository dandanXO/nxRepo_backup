import React, {Component} from 'react';
import { Form, Row, Col, Input, DatePicker, Select, Button } from 'antd';
import PropTypes from 'prop-types';
const {RangePicker} = DatePicker;
const Option = Select.Option;
import { orderStatus } from 'utils';
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

    renderExpress = () => {
        const { expressData } = this.props;
        const ele = expressData.map(item => <Option value={item.name} key={item.id}>{item.name}</Option>);
        return [<Option value={''} key={''}>不限</Option>].concat(ele);
    }

    render() {
        const { form: { getFieldDecorator } } = this.props;
        return (
            <div>
                <Form onSubmit={this.submit}>
                    <Row>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'寄回时间'}>
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
                            <Form.Item {...formItemLayout} label={'手机号'}>
                                {
                                    getFieldDecorator('userPhone', {
                                        initialValue: ""
                                    })(
                                        <Input placeholder={'请输入手机号'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'姓名'}>
                                {
                                    getFieldDecorator('userName', {
                                        initialValue: ""
                                    })(
                                        <Input placeholder={'请输入姓名'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'订单号'}>
                                {
                                    getFieldDecorator('orderNo', {
                                        initialValue: ""
                                    })(
                                        <Input placeholder={'请输入订单号'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'快递单号'}>
                                {
                                    getFieldDecorator('expressNo', {
                                        initialValue: ""
                                    })(
                                        <Input placeholder={'请输入快递单号'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'回收状态'}>
                                {
                                    getFieldDecorator('status', {
                                        initialValue: '9'
                                    })(
                                        <Select>
                                            <Option value={'9'}>不限</Option>
                                            <Option value={'0'}>邮寄中</Option>
                                            <Option value={'1'}>已关闭</Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'快递公司'}>
                                {
                                    getFieldDecorator('expressCompany', {
                                        initialValue: ""
                                    })(
                                        <Select>
                                            {this.renderExpress()}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={16} style={{textAlign:'right'}}>
                            <Button type="primary" htmlType="submit">查询</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}
SearchList.propTypes = {
    handleSearch: PropTypes.func,
    expressData: PropTypes.array
};
SearchList.defaultProps = {
    handleSearch: () => {},
    expressData: []
};

export default Form.create()(SearchList);