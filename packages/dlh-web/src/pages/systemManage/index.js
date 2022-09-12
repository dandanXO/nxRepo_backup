import { combineReducers } from 'redux';
import { fork, all } from 'redux-saga/effects';
// import { AdminManage, adminManageState, adminManageSaga } from './AdminManage';
import { MenuManage, menuMangeSaga, menuManageState } from './MenuManage';
import { DepartmentManage, departmentManageState, departmentManageSaga } from './DepartmentManage';
import { RoleManage, roleManageState, roleMangeSaga } from './RoleManage';
import { PeopleManage, peopleManageSaga, peopleManageState } from './PeopleManage';
import { FeedbackManage, feedbackManageSaga, feedbackManageState } from './FeedbackManage';
import { ScheduleJobManage, scheduleJobManageSaga, scheduleJobManageState } from './ScheduleJobManage';
import { ConfigManage,configManageState,configManageSaga } from './ConfigManage';
import { RiskControlConfigManage,riskControlConfigManageState,riskControlConfigManageSaga } from './RiskControlConfigManage';
import { RiskManage,riskManageState,riskManageSaga } from './RiskManage';
import { YysManage,yysManageState,yysManageSaga } from './YysManage';
import { ServiceFeeManage,serviceFeeManageState,serviceFeeManageSaga } from './ServiceFeeManage';
import { RiskSwitchManage,riskSwitchManageState,riskSwitchManageSaga } from './RiskSwitchManage';
import { SiteBlackManage, siteBlackManageSaga, siteBlackManageState } from './SiteBlackManage';
import { OperationLogManage , operationLogManageState, operationLogManageSaga } from './OperationLogManage';
import { BalanceQuery, balanceQueryState, balanceQuerySaga } from './BalanceQuery';
import { CollectTeamManage , collectTeamManageState, collectTeamManageSaga } from './CollectTeamManage';
const systemManageRoutes = [
    // { path: '/adminManage', component: AdminManage },
    { path: '/menuManage', component: MenuManage },
    { path: '/operationLogManage', component: OperationLogManage },
    { path: '/departmentManage', component: DepartmentManage },
    { path: '/roleManage', component: RoleManage },
    { path: '/peopleManage', component: PeopleManage },
    { path: '/feedbackManage', component: FeedbackManage },
    { path: '/scheduleJobManage', component: ScheduleJobManage },
    { path: '/configManage', component: ConfigManage },
    { path: '/riskControlConfigManage', component: RiskControlConfigManage },
    { path: '/riskManage', component: RiskManage },
    { path: '/yysManage', component: YysManage },
    { path: '/serviceFeeManage', component: ServiceFeeManage },
    { path: '/riskSwitchManage', component: RiskSwitchManage },
    { path: '/siteBlackManage', component: SiteBlackManage },
    { path: '/collect-team-manage', component: CollectTeamManage },
    { path: '/balanceQuery', component: BalanceQuery }
];

const systemManageMenuList = [
    {
        title: '系统管理',
        key: '/systemManage',
        icon: 'setting',
        children: [
            {
                title: '部门管理',
                key: '/departmentManage',
                icon: 'team'
            },
            {
                title: '角色管理',
                key: '/roleManage',
                icon: 'disconnect'
            },
            {
                title: '人员管理',
                key: '/peopleManage',
                icon: 'user-add'
            },
            {
                title: '用户反馈',
                key: '/feedbackManage',
                icon: 'solution'
            },
            {
                title: '参数配置',
                key: '/configManage',
                icon: 'setting'
            },
            {
                title: '风控配置',
                key: '/riskManage',
                icon: 'setting'
            },
            {
                title: '运营商配置',
                key: '/yysManage',
                icon: 'setting'
            },
            {
                title: '定时任务',
                key: '/scheduleJobManage',
                icon: 'solution'
            },
            {
                title: '服务费率管理',
                key: '/serviceFeeManage',
                icon: 'solution'
            },
            {
                title: '风控配置',
                key: '/riskControlConfigManage',
                icon: 'setting'
            },
            {
                title: '渠道风控',
                key: '/riskManage',
                icon: 'setting'
            },
            {
                title: '撸贷库管理',
                key: '/siteBlackManage',
                icon: 'solution'
            }
            ,
            {
                title: '操作日志管理',
                key: '/operationLogManage',
                icon: 'solution'
            }
            ,
            {
                title: '催收团队管理',
                key: '/collect-team-manage',
                icon: 'solution'
            },
            {
                title: '余额查询',
                key: '/balanceQuery',
                icon: 'dollar'
            }
        ]
    }
];
const systemManageState = combineReducers({
    menuManageState,
    departmentManageState,
    roleManageState,
    peopleManageState,
    operationLogManageState,
    feedbackManageState,
    configManageState,
    riskControlConfigManageState,
    riskManageState,
    yysManageState,
    scheduleJobManageState,
    serviceFeeManageState,
    riskSwitchManageState,
    siteBlackManageState,
    collectTeamManageState,
    balanceQueryState
})
function* systemManageSaga() {
    yield all([
        fork(menuMangeSaga),
        fork(departmentManageSaga),
        fork(roleMangeSaga),
        fork(peopleManageSaga),
        fork(feedbackManageSaga),
        fork(configManageSaga),
        fork(riskControlConfigManageSaga),
        fork(riskManageSaga),
        fork(yysManageSaga),
        fork(scheduleJobManageSaga),
        fork(serviceFeeManageSaga),
        fork(riskSwitchManageSaga),
        fork(siteBlackManageSaga),
        fork(operationLogManageSaga),
        fork(collectTeamManageSaga),
        fork(balanceQuerySaga)
    ])
}
export { systemManageRoutes, systemManageMenuList, systemManageState, systemManageSaga };