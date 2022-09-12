import React, {Component} from 'react';
import { Form, Row, Col, Input, DatePicker, Select, Button } from 'antd';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";

const {RangePicker} = DatePicker;
const Option = Select.Option;
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};

class SearchList extends Component {
    constructor(props) {
        super(props);
       
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { form: { getFieldsValue }, submit } = this.props;
        const params = getFieldsValue();
        submit(params);
    }

    renderMappingList = () => {
        const { mappingListData } = this.props;
        const ele = mappingListData.map(item => <Option key={item.operationName} value={item.operationName} >{item.operationName}</Option>);
        return [<Option value={''} key={''}><FormattedMessage id="page.search.list.no.restrict" /></Option>].concat(ele);
    }


    render() {
        const {form: {getFieldDecorator},initTime, intl} = this.props;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                    
                    <Col span={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.table.operation.time"})}>
                                {
                                    getFieldDecorator('time', {
                                        initialValue: initTime
                                    })(
                                        <RangePicker placeholder={[intl.formatMessage({id : "page.search.list.select"}), intl.formatMessage({id : "page.search.list.select"})]}/>
                                    )
                                }
                            </Form.Item>
                        </Col>


                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.table.operation.people"})}>
                                {
                                    getFieldDecorator('phoneNo', {
                                        initialValue: ''
                                    })(
                                        <Input placeholder={intl.formatMessage({id : "page.search.list.mobile.enter"})}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                     
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.log.type"})}>
                                {
                                    getFieldDecorator('type', {
                                        initialValue: ''
                                    })(
                                        <Select>
                                            {this.renderMappingList()}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                      
                    
                        <Col span={24} style={{textAlign:'right'}}>
                            <Button type="primary" htmlType="submit"><FormattedMessage id="page.search.list.search" /></Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

SearchList.propTypes = {
    submit: PropTypes.func,
    mappingListData: PropTypes.array,
    initTime: PropTypes.array,
    intl: PropTypes.object.isRequired,
};
SearchList.defaultProps = {
    submit: () => {

    },
    mappingListData: [],
    initTime: [],
}

export default Form.create()(injectIntl(SearchList));