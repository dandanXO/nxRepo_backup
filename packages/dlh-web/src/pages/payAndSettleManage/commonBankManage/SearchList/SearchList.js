import React, { Component } from 'react';
import { Form, Row, Col, Button, Input, Select } from 'antd';
import PropTypes from 'prop-types';


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
        // const { visible,allPayPlatList,allPayTypeList, form: { getFieldDecorator,getFieldsValue } } = this.props;
        handleSearch(getFieldsValue());
    }

    render() {
        const {form: { getFieldDecorator  }  } = this.props;
        // console.dir(allPayPlatList);
        return (
            <div>
                <Form>
                    <Row>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'银行名称'}>
                                {
                                    getFieldDecorator('name', {
                                        initialValue: ""
                                    })(
                                        <Input placehoder={'请输入银行名称'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'银行卡名称'}>
                                {
                                    getFieldDecorator('cardName', {
                                        initialValue: ""
                                    })(
                                        <Input placehoder={'请输入银行卡名称'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'分行名称'}>
                                {
                                    getFieldDecorator('branchName', {
                                        initialValue: ""
                                    })(
                                        <Input placehoder={'请输入分行名称'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'银行卡类型'}>
                                {
                                    getFieldDecorator('cardType', {
                                        initialValue: ""
                                    })(
                                        <Input placehoder={'请输入银行卡类型'}/>
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