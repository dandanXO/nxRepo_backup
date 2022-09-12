import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, DatePicker, Row, Col, Button, Select } from 'antd';
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
        const { form: { getFieldsValue }, handleSearch } = this.props;
        handleSearch(getFieldsValue());
    };
    
    retu = () => {
        const { form: { getFieldsValue }, exportRecord } = this.props;
        exportRecord(getFieldsValue());
    };

    render() {
        const { form: { getFieldDecorator  }, initTime, channelList  } = this.props;
        return (
            <div>
                <Form onSubmit={this.submit}>
                    <Row gutter={60}>
                        <Col span={8}>
                            <Form.Item {...formItemLayout} label={"到期时间"}>
                                {
                                    getFieldDecorator('time', {
                                        initialValue: initTime
                                    })(
                                        <RangePicker placeholder={['请选择', '请选择']}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item {...formItemLayout} label={'渠道'}>
                                {
                                    getFieldDecorator('channelId', {
                                        initialValue: ""
                                    })(
                                        <Select initialValue=''>
                                            {channelList.length > 0 && channelList.map((item, i) => {
                                                let idStr = item.id !== '' ? '('+item.id+')' :'';
                                                return <Select.Option key={i} value={item.id}>{item.name} {idStr}</Select.Option>
                                            })}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={18}>
                            <Form.Item style={{textAlign:'right'}}>
                                <Button type={'primary'} htmlType={'submit'}>查询</Button>
                                <Button type={'danger'} style={{marginLeft:'10px'}} disabled={this.props.btnDisable} onClick={this.retu}>导出</Button>
                           </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>

        );
    }
}
SearchList.propTypes = {
    handleSearch: PropTypes.func,
    initTime: PropTypes.array,
    channelList: PropTypes.array
};
SearchList.defaultProps = {
    handleSearch: () => {},
    initTime: [],
    channelList : [],
};

export default Form.create()(SearchList);