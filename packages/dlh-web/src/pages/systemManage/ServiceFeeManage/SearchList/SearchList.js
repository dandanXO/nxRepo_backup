import React, { Component } from 'react';
import { Form, Row, Col, Button, Input,Select } from 'antd';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";

const formItemLayout = {
    labelCol: {span: 10},
    wrapperCol: {span: 14},
};
class SearchList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            searchParams : {}
        };
    }
    componentDidMount() {
    }
    handleClick = () => {
        const { handleSearch, form: { getFieldsValue } } = this.props;
        handleSearch(getFieldsValue());
    }

    render() {
        const { form: { getFieldDecorator  }, channelList,searchParams, intl  } = this.props;
        
        return (
            <div>
                <Form>
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.belonging.channel"})}>
                                {
                                    getFieldDecorator('channelId', {
                                        initialValue: "",
                                        rules: [{ required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                    })(
                                        <Select initialValue=''>
                                            {channelList.length > 0 && channelList.map((item, i) => {
                                                return <Select.Option key={i} value={item.id}>{item.name}({item.id})</Select.Option>
                                            })}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        
                        <Col span={22}>
                            <Form.Item style={{textAlign:'right'}}>
                                <Button onClick={this.handleClick} type={'primary'}><FormattedMessage id="page.search.list.search" /></Button>
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
    channelList: PropTypes.array,
    searchParams: PropTypes.object,
    intl: PropTypes.object.isRequired,
}
SearchList.defaultProps = {
    handleSearch() {
        
    },
    channelList : [],
    searchParams : {
        name : '', key : '',channelId : -99
    }
}

export default Form.create({
    mapPropsToFields(props){
        const { searchParams = {} } = props;
        return {
            channelId: Form.createFormField({
                value: searchParams['channelId']
            }),
            name: Form.createFormField({
                value: searchParams['name']
            })
        }
    }
})(injectIntl(SearchList));