import { all, fork } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import IndexStatistics from './IndexStatistics';
import indexStatisticsState from './models/reducers';
import indexStatisticsSaga from './models/saga';
export const indexStatisticsRoutes = [
    { path: '/index', component: IndexStatistics }
];
export const indexStatisticsMenuList = [
    {
        title: '首页',
        key: '/index',
        icon: 'home',
    }
];

export const indexStatisticsAllState = combineReducers({
    indexStatisticsState
})

export function* indexStatisticsAllSaga () {
    yield all([
        fork(indexStatisticsSaga)
    ]);
}


// export { indexStatisticsMenuList, indexStatisticsRoutes };