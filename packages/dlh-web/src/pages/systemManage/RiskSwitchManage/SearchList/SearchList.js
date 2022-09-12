import React, { Component } from 'react';
import { Form, DatePicker, Row, Col, Button, Input,Select } from 'antd';
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
        handleSearch(getFieldsValue());
    }

    render() {
        const { form: { getFieldDecorator  }  } = this.props;
        return (
            <div>
                <Form>
                <Row gutter={24}>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'配置名称'}>
                                {
                                    getFieldDecorator('name', {
                                        initialValue: ""
                                    })(
                                        <Input placehoder={'请输入配置名称'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item {...formItemLayout} label={'状态'}>
                                {
                                    getFieldDecorator('value', {
                                        initialValue: ""
                                    })(
                                        <Select>
                                            <Option value={''}>不限</Option>
                                            <Option value={'1'}>开启</Option>
                                            <Option value={'0'}>关闭</Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                       <Col lg={12} xl={8}>
                            <Form.Item>
                                <Button onClick={this.handleClick} type={'primary'}>查询</Button>
                            </Form.Item>
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