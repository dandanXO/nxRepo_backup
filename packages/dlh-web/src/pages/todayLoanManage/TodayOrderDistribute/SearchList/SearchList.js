import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, DatePicker, Row, Col, Button, Select, Input } from 'antd';
import {FormattedMessage, injectIntl} from "react-intl";
const { Option } = Select;

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
    }
    renderMerchants = () => {
      const { allMerchants } = this.props;
      if(!allMerchants) return;
      const ele = allMerchants.map(item => <Option key={item.merchantId} value={item.merchantId} >{item.name}</Option>);
      return [<Option value={''} key={''}><FormattedMessage id="page.search.list.no.restrict" /></Option>].concat(ele);
    }


    render() {
        const { form: { getFieldDecorator  }, intl, isSuperAdmin  } = this.props;
        return (
            <div>
                <Form onSubmit={this.submit}>
                    {isSuperAdmin &&
                        <Row gutter={40}>
                            {/*<Col span={8}>*/}
                            {/*    <Form.Item {...formItemLayout} label={"逾期时间"}>*/}
                            {/*        {*/}
                            {/*            getFieldDecorator('time', {*/}
                            {/*                initialValue: []*/}
                            {/*            })(*/}
                            {/*                <RangePicker placeholder={['请选择', '请选择']}/>*/}
                            {/*            )*/}
                            {/*        }*/}
                            {/*    </Form.Item>*/}
                            {/*</Col>*/}
                            {/*<Col span={8}>*/}
                            {/*    <Form.Item {...formItemLayout} label={"手机号"}>*/}
                            {/*        {*/}
                            {/*            getFieldDecorator('userPhone', {*/}
                            {/*                initialValue: ''*/}
                            {/*            })(*/}
                            {/*                <Input placeholder={'请输入手机号'}/>*/}
                            {/*            )*/}
                            {/*        }*/}
                            {/*    </Form.Item>*/}
                            {/*</Col>*/}

                            {/* <Col lg={12} xl={8}>
                                <Form.Item {...formItemLayout} label={intl.formatMessage({ id: "page.search.list.merchantName" })}>
                                    {
                                        getFieldDecorator('merchantId', {
                                            initialValue: ''
                                        })(
                                            <Select>
                                                {this.renderMerchants()}
                                            </Select>
                                        )
                                    }
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item style={{ textAlign: 'right' }}>
                                    <Button type={'primary'} htmlType={'submit'}>查询</Button>
                                </Form.Item>
                            </Col> */}
                        </Row>
                    }
                </Form>
            </div>

        );
    }

}
SearchList.propTypes = {
    handleSearch: PropTypes.func,
};
SearchList.defaultProps = {
    handleSearch: () => {}
};


export default Form.create()(injectIntl(SearchList));
