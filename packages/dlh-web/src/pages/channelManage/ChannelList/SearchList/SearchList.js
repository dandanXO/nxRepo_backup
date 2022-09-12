import React, { Component } from 'react';
import { Form, DatePicker, Row, Col, Button, Input,Select } from 'antd';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";

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
    renderRole = () => {
        const { roleData } = this.props;
        //return roleData.map(item => <Option key={item.id} value={item.name} >{item.name}</Option>)//role
        return roleData.map(item => <Option key={item.id} value={item.modelName} >{item.modelName}</Option>)//mine
    }

    render() {
        let riskPlan = sessionStorage.getItem('riskPlan');
        let hide = 'none';
        let lgNumber = 24;
        let xlNumber = 16;
        if(riskPlan === 'C'){
            hide = 'black';
            lgNumber = 12;
            xlNumber = 8;
        }
        const { form: { getFieldDecorator  } , intl } = this.props;
        return (
            <div>
                <Form>
                    <Row>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.time"})}>
                                {
                                    getFieldDecorator('time', {
                                        initialValue: []
                                    })(
                                        <RangePicker placeholder={[intl.formatMessage({id : "page.search.list.no.restrict"}), intl.formatMessage({id : "page.search.list.no.restrict"})]}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.channelId"})}>
                                {
                                    getFieldDecorator('name', {
                                        initialValue: ""
                                    })(
                                        <Input placeholder={intl.formatMessage({id : "page.search.list.channelId.enter"})+'('+intl.formatMessage({id : "page.search.list.support.fuzzy.query"})+')'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.hyperlink"})}>
                                {
                                    getFieldDecorator('url', {
                                        initialValue: ""
                                    })(
                                        <Input placeholder={intl.formatMessage({id : "page.search.list.hypelink.enter"})+'('+intl.formatMessage({id : "page.search.list.support.fuzzy.query"})+')'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.table.channel.status"})}>
                                {
                                    getFieldDecorator('enabled', {
                                        initialValue: "1"
                                    })(
                                        <Select>
                                            <Option value={''}><FormattedMessage id="page.search.list.no.restrict" /></Option>
                                            <Option value={'0'}><FormattedMessage id="page.search.list.disable" /></Option>
                                            <Option value={'1'}><FormattedMessage id="page.table.enabled" /></Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8} style={{display:hide}}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.table.risk.control.plan"})}>
                                {
                                    getFieldDecorator('modelName', {
                                        initialValue: ""
                                    })(
                                        <Select>
                                            {this.renderRole()}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>           
                        <Col lg={lgNumber} xl={xlNumber} style={{textAlign:'right'}}>
                                <Button onClick={this.handleClick} type={'primary'}><FormattedMessage id="page.search.list.search" /></Button>
                        </Col>
                    </Row>
                </Form>
            </div>

        );
    }

}
SearchList.propTypes = {
    handleSearch: PropTypes.func,
    intl: PropTypes.object.isRequired,
}
SearchList.defaultProps = {
    handleSearch() {}
}

export default Form.create()(injectIntl(SearchList));