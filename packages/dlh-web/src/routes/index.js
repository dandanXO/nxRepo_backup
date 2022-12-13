import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { loginRoutes } from '../pages/login';
import { googleAuthRoutes } from '../pages/googleauth';
import { indexStatisticsRoutes } from '../pages/indexStatistics';
import { userManageRoutes } from '../pages/userManage';
import { windControlCheckRoutes } from '../pages/windControlCheck';
import { channelManageRoutes } from '../pages/channelManage';
import { afterLoanManageRoutes } from '../pages/afterLoanManage';
import { systemManageRoutes } from '../pages/systemManage';
import { h5ManageRoutes } from '../pages/h5Manage';
import { businessStatisticsRoutes } from '../pages/businessStatistics';
import { operatorManageRoutes } from '../pages/operatorManage';
import { paymentManageRoutes } from '../pages/paymentManage';
import { riskFeeManageRoutes } from '../pages/riskFeeManage';
import { todayLoanManageRoutes } from '../pages/todayLoanManage';
import { payAndSettleManageRoutes } from '../pages/payAndSettleManage';
import { extensionPeriodLoanManageRoutes } from '../pages/extensionPeriodLoanManage';
import { telSaleManageRoutes } from '../pages/telSaleManage';
import { RouteForNewCMSAdapter } from "../microApp/RouteForNewCMSAdapter";

const allRoutes = [].concat(
    userManageRoutes,
    windControlCheckRoutes,
    loginRoutes,
    googleAuthRoutes,
    channelManageRoutes,
    afterLoanManageRoutes,
    systemManageRoutes,
    h5ManageRoutes,
    businessStatisticsRoutes,
    operatorManageRoutes,
    paymentManageRoutes,
    riskFeeManageRoutes,
    todayLoanManageRoutes,
    payAndSettleManageRoutes,
    extensionPeriodLoanManageRoutes,
    telSaleManageRoutes,
);

export default class Routes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderRoutes = () => {
        const { list } = this.props;
        let listArr = list.reduce((prev, current) => {
            return prev.concat(current['children'] || []);
        }, []);
        listArr = listArr.map(item => item['actionUrl']);
        let realRoutes = [];
        for(let i = 0, len = allRoutes.length; i < len; i++) {
            const currentPath = allRoutes[i].path;
            const isFind = listArr.find(item => currentPath.indexOf(item) !== -1);
            if(isFind) {
                realRoutes.push(allRoutes[i]);
            }
        }
        realRoutes = realRoutes.concat(indexStatisticsRoutes);
        // FIXME:
        const BasePath = ""
        return  realRoutes.map(item => <Route exact={!!item.exact} key={item.path} path={BasePath + item.path} component={item.component}/>);
    }

    render() {
        return (
            <Switch>
                {/*NOTICE: Old CMS*/}
                {this.renderRoutes()}
                {/*NOTICE: New CMS*/}
                <RouteForNewCMSAdapter />
                <Route key={'/noFound'} render={() => <div>no found</div>}/>
            </Switch>
        );
    }
}
Routes.propTypes = {
    list: PropTypes.array
};
Routes.defaultProps = {
    list: []
};
