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
        const { form: { getFieldsValue }, handleSearch } = this.props;
        const params = getFieldsValue();
        handleSearch(params);
    }
    render() {
        const {form: {getFieldDecorator}} = this.props;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Row gutter={40}>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'iCloud账号'}>
                                {
                                    getFieldDecorator('icloudNo', {
                                        initialValue: ''
                                    })(
                                        <Input placehoder={'iCloud账号'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'结清时间'}>
                                {
                                    getFieldDecorator('time', {
                                        initialValue: []
                                    })(
                                        <RangePicker placeholder={['请选择', '请选择']}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={24} xl={8} style={{textAlign:'right'}}>
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
    handleSearch(){}
};

export default Form.create()(SearchList);