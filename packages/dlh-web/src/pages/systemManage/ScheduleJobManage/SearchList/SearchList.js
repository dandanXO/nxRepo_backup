import React, {Component} from 'react';
import { Form, Row, Col, Input, Select, Button } from 'antd';
import PropTypes from 'prop-types';
const Option = Select.Option;
import { orderStatus } from 'utils';
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
                    <Row>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'任务名称'}>
                                {
                                    getFieldDecorator('jobName', {
                                        initialValue: ''
                                    })(
                                        <Input placeholder={'请输入任务名称'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'状态'}>
                                {
                                    getFieldDecorator('status', {
                                        initialValue: ''
                                    })(
                                        <Select>
                                            <Option value={''}>不限</Option>
                                            <Option value={'1'}>运行</Option>
                                            <Option value={'2'}>暂停</Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={24} style={{textAlign:'right'}}>
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
    submit: () => {

    }
}

export default Form.create()(SearchList);