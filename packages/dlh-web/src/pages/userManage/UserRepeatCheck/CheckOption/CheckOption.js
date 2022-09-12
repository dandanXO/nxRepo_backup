import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { Steps } from 'antd';
import PropTypes from 'prop-types';
import {covertUrlParams} from 'utils';
import BaseInfo from '../BaseInfo/BaseInfo';
import CheckResult from '../CheckResult/CheckResult';
import OperatorInfo from '../OperatorInfo/OperatorInfo';
import UnionDebtsInfo from '../UnionDebtsInfo/UnionDebtsInfo';
import styles from './CheckOption.less';
import {injectIntl} from "react-intl";

class CheckOption extends Component {
    constructor(props) {
        super(props);
        // this.params = ['baseInfo', 'operatorInfo','unionDebtsInfo', 'checkResult']
        this.params = ['baseInfo','operatorInfo', 'checkResult']
    }

    handleSubmit = (obj) => {
        this.props.handleSubmit(obj);
    }

    handleReload = (obj) => {
        this.props.handleReload(obj);
    }

    

    handleStepClick = (params) => {
        const { location: { pathname }, history: { push } } = this.props;
        push(`${pathname}?option=${params}`);

    }

    render() {
        const {location: {search}, allData, loading ,isLastCheck, intl } = this.props;
        const obj = covertUrlParams(search);
        const key = obj['option'];
        const current = this.params.indexOf(key);
        return (
            <div>
                <div className={styles.stepWrapper}>
                    <Steps current={current}>
                        <Steps.Step className={styles.step} onClick={() => this.handleStepClick('baseInfo')} title={intl.formatMessage({id : "windowPage.base.info"})}/>
                        <Steps.Step className={styles.step} onClick={() => this.handleStepClick('operatorInfo')} title={intl.formatMessage({id : "windowPage.contact.list"})}/>
                        {/* <Steps.Step className={styles.step} onClick={() => this.handleStepClick('unionDebtsInfo')} title={'共债信息'}/> */}
                        <Steps.Step className={styles.step} onClick={() => this.handleStepClick('checkResult')} title={intl.formatMessage({id : "windowPage.submit.review.result"})}/>
                    </Steps>
                </div>
                <div>
                    {
                        key === 'baseInfo' && <BaseInfo info={allData['info']}/>
                    }
                    {
                        key === 'operatorInfo' && <OperatorInfo message={allData['message']} info={allData['info']} />
                    }
                     {/*{
                        key === 'unionDebtsInfo'
                        && <UnionDebtsInfo
                         debtsRecord={allData['debtsRecord']} info={allData['info']}
                        
                        handleReload = {this.handleReload}
                        loading={loading}
                        />
                    } */}
                    {
                        key === 'checkResult'
                        && <CheckResult
                            isLastCheck={isLastCheck}
                            loading={loading}
                            handleSubmit={this.handleSubmit}
                        />
                    }
                </div>
            </div>
        );
    }
}

CheckOption.propTypes = {
    allData: PropTypes.object,
    current: PropTypes.number,
    handleSubmit: PropTypes.func,
    handleReload: PropTypes.func,
    loading: PropTypes.bool,
    isLastCheck: PropTypes.bool,
    intl: PropTypes.object.isRequired,
}
CheckOption.defaultProps = {
    allData: {
        info: {},
        message: {},
        data: {}
    },
    current: 0,
    handleSubmit() {

    },
    handleReload() {

    },
    loading: false,
    isLastCheck: false
}

export default withRouter(injectIntl(CheckOption));