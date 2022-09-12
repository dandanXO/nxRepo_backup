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

    render() {
        const { form: { getFieldDecorator } } = this.props;
        return (
            <div>
                <Form onSubmit={this.submit}>
                    <Row>
                    <Col lg={12} xl={8}>
                        <Form.Item {...formItemLayout} label={'签收时间'}>
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

                    <Col lg={24} xl={16} style={{textAlign:'right'}}>
                        <Button type="primary" htmlType="submit">查询</Button>
                    </Col>
                </Row>
                </Form>
            </div>
        );
    }
}
SearchList.propTypes = {
    handleSearch: PropTypes.func
};
SearchList.defaultProps = {
    handleSearch: () => {}
};

export default Form.create()(SearchList);