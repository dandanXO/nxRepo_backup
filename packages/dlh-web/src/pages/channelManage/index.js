import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { ChannelGather ,channelGatherState, channelGatherSaga } from './ChannelGather'
import { ChannelStatistics, channelStatisticsState, channelStatisticsSaga } from './ChannelStatistics';
import { ChannelList, channelListState, channelListSaga } from './ChannelList';
import { ChannelStatistics2, channelStatistics2State, channelStatistics2Saga } from './ChannelStatistics2';
import { ChannelUser,channelUserState,channelUserSaga } from './ChannelUser';
const channelManageRoutes  = [
    // { path: '/channelGather', component: ChannelGather },
    { path: '/channelStatistics', component: ChannelStatistics },
    { path: '/channelList', component: ChannelList },
    { path: '/channelStatistics2', component: ChannelStatistics2 },
    { path: '/channelUser', component: ChannelUser }
]

const channelManageMenuList = [
    {
        title: '渠道管理',
        key: '/channelManage',
        icon: 'layout',
        children: [
            // {
            //     title: '渠道汇总',
            //     key: '/channelGather',
            //     icon: 'area-chart'
            // },
            {
                title: '渠道统计',
                key: '/channelStatistics',
                icon: 'pie-chart'
            },
            {
                title: '渠道列表',
                key: '/channelList',
                icon: 'bar-chart'
            },
            {
                title: '渠道统计二',
                key: '/channelStatistics2',
                icon: 'area-chart'
            },
            {
                title: '渠道用户列表',
                key: '/ChannelUser',
                icon: 'bar-chart'
            }
        ]
    }
]
const channelManageState = combineReducers({
    channelGatherState,
    channelStatisticsState,
    channelListState,
    channelStatistics2State,
    channelUserState
})

function* channelManageSaga() {
    yield all([
        fork(channelGatherSaga),
        fork(channelStatisticsSaga),
        fork(channelListSaga),
        fork(channelStatistics2Saga),
        fork(channelUserSaga)
    ])
}

export { channelManageMenuList, channelManageRoutes, channelManageSaga, channelManageState};