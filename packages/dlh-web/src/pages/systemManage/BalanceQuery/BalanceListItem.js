import React from 'react';
import styles from './BalanceQuery.less';
import { Button, Icon } from 'antd';
import { injectIntl, FormattedMessage } from "react-intl";
function BalanceListItem({ balanceQueryList, venderCode, balance, getBalanceQueryData, canUpdate = true }) {

    return (
        <div className={styles.balanceListItem}>
            <div className={styles.balanceHeader}>
                <div className={styles.venderCode}><FormattedMessage id={venderCode} /></div>
                {canUpdate && <Button type="primary" size="small" ghost onClick={() => getBalanceQueryData({ balanceQueryList, 'smsVenderName': venderCode })}><FormattedMessage id="refresh.balance" /></Button>}
            </div>
            <div className={styles.BalanceContent}>
                <div className={styles.textTitle}><Icon type="account-book" className={styles.iconStyle} /><FormattedMessage id="current.balance" /></div>
                <div className={styles.balanceText}>{balance ? Number(balance) : <FormattedMessage id="page.table.no.data" />}</div>
            </div>
        </div>
    );
}

export default injectIntl(BalanceListItem);
