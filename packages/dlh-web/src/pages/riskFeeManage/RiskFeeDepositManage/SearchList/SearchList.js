import React, {Component} from 'react';
import { Form, Row, Col, Input, DatePicker, Select, Button } from 'antd';
import PropTypes from 'prop-types';
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
        const { form: { getFieldsValue }, submit } = this.props;
        const params = getFieldsValue();
        submit(params);
    }
    render() {
        const {form: {getFieldDecorator}} = this.props;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Row gutter={24}>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'记录时间'}>
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
                            <Form.Item {...formItemLayout} label={'手机号码'}>
                                {
                                    getFieldDecorator('phoneNo', {
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
                                    getFieldDecorator('nameTrue', {
                                        initialValue: ''
                                    })(
                                        <Input placehoder={'姓名'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12} xl={24} style={{textAlign:'right'}}>
                            <Button type="primary" htmlType="submit">查询</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}
SearchList.propTypes = {
    submit: PropTypes.func
};
SearchList.defaultProps = {
    submit: () => {}
};

export default Form.create()(SearchList);