import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Form, DatePicker, Row, Col, Button, Select } from 'antd';
import {injectIntl, FormattedMessage} from "react-intl";

const { Option } = Select;

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

    renderSourceData = () => {
        const { sourceData } = this.props;
        const ele = sourceData.map((item, index) => <Option value={item.id} key={index}>{item.name}</Option>);
        return [<Option value={''} key={''}><FormattedMessage id="page.search.list.no.restrict" /></Option>].concat(ele);
    }
    submit = (e) => {
        e.preventDefault();
        const { form: { getFieldsValue }, handleSearch } = this.props;
        handleSearch(getFieldsValue());
    }
    retu = () => {
        const { form: { getFieldsValue }, handlReturn } = this.props;
        handlReturn(getFieldsValue());
    }
    render() {
        const { form: { getFieldDecorator  }, initTime, intl  } = this.props;
        return (
            <div>
                <Form onSubmit={this.submit}>
                    <Row gutter={40}>
                        <Col span={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.time"})}>
                                {
                                    getFieldDecorator('time', {
                                        initialValue: initTime
                                    })(
                                        <RangePicker placeholder={[intl.formatMessage({id : "page.search.list.select"}), intl.formatMessage({id : "page.search.list.select"})]}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.table.channel.source"})}>
                                {
                                    getFieldDecorator('channelId', {
                                        initialValue: ""
                                    })(
                                        <Select>
                                            {this.renderSourceData()}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item style={{textAlign:'right'}}>
                                <Button type={'primary'} htmlType={'submit'}><FormattedMessage id="page.search.list.search" /></Button>
                                <Button type={'primary'} style={{marginLeft:'10px'}}  disabled={this.props.btnDisable} onClick={this.retu}><FormattedMessage id="page.table.export" /></Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>

        );
    }

}
SearchList.propTypes = {
    sourceData: PropTypes.array,
    handleSearch: PropTypes.func,
    initTime: PropTypes.array,
    intl: PropTypes.object.isRequired,
};
SearchList.defaultProps = {
    sourceData: [],
    handleSearch: () => {},
    initTime: []
};

export default Form.create()(injectIntl(SearchList));