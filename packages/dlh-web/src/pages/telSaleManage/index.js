import { combineReducers } from 'redux';
import { fork, all } from 'redux-saga/effects';
import telSaleState from './models/reducers';
import telSaleSaga from './models/saga';
import TelSaleDistributePage  from './TelSaleDistributePage/TelSaleDistributePage';
import TelSaleListNewGuestPage from './TelSaleListNewGuestPage/TelSaleListNewGuestPage';
import TelSaleListOldGuestPage from './TelSaleListOldGuestPage/TelSaleListOldGuestPage';
import TelSaleDetailNewGuestPage from './TelSaleDetailNewGuestPage/TelSaleDetailNewGuestPage';
import TelSaleDetailOldGuestPage from './TelSaleDetailOldGuestPage/TelSaleDetailOldGuestPage';
import TelSaleStatisticsPage from './TelSaleStatisticsPage/TelSaleStatisticsPage';


const telSaleManageRoutes = [
    { path: '/tel-sale-distribute', component: TelSaleDistributePage },
    { path: '/tel-sale-new-guest', component: TelSaleListNewGuestPage, exact: true },
    { path: '/tel-sale-new-guest/:id', component: TelSaleDetailNewGuestPage },
    { path: '/tel-sale-old-guest', component: TelSaleListOldGuestPage , exact: true },
    { path: '/tel-sale-old-guest/:id', component: TelSaleDetailOldGuestPage },
    { path: '/tel-sale-statistics', component: TelSaleStatisticsPage },
];

const telSaleManageState = combineReducers({
    telSaleState,
})
function* telSaleManageSaga () {
    yield all([
        fork(telSaleSaga),
    ])
}
export { telSaleManageRoutes, telSaleManageState, telSaleManageSaga };