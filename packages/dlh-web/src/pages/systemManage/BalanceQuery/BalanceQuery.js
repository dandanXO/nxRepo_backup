import React ,{useEffect}from 'react';
import styles from './BalanceQuery.less';
import BalanceListItem from './BalanceListItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { balanceQueryAction } from './index';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";

function BalanceQuery({ balanceQueryList, getAllBalanceQueryData, getBalanceQueryData }) {

    useEffect(() => {
      getAllBalanceQueryData();
    }, [])

    const riskFeeBalance=sessionStorage.getItem('riskFee')
    return (
      <div className={styles.balanceList}>
         <BalanceListItem
              key={'riskFee'}
              venderCode={'riskFee'}
              balance={riskFeeBalance}
              canUpdate={false}
            />
        {balanceQueryList.length > 0 && balanceQueryList.map((query) => {
          return (
            <BalanceListItem
              key={query.venderCode}
              venderCode={query.venderCode}
              balance={query.balance}
              getBalanceQueryData={getBalanceQueryData}
              balanceQueryList={balanceQueryList}
            />
          );
        })}
      </div>
    );
}
const mapStateToProps = (state) => {
    const { systemManageState: { balanceQueryState } } = state;
    return {
        balanceQueryList: balanceQueryState['balanceQueryData'],
    }
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getAllBalanceQueryData: balanceQueryAction.getAllBalanceQuery,
    getBalanceQueryData: balanceQueryAction.getBalanceQuery,
  }, dispatch)
}

BalanceQuery.propTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(BalanceQuery));

