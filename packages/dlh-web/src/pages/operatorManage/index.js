import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { RemoveBill, removeBillState, removeBillSaga } from './RemoveBill';
import { ExportOperator } from './ExportOperator';
import { RiskControlModelData, riskControlModelDataState, riskControlModelDataSaga } from './RiskControlModelData';
import {RiskJointDebtModelData, riskJointDebtModelDataState, riskJointDebtModelDataSage} from './RiskJointDebtModelData';
const operatorManageRoutes  = [
    { path: '/removeBill', component: RemoveBill },
    { path: '/exportOperator', component: ExportOperator },
    { path: '/riskControlModel', component: RiskControlModelData },
    { path: '/riskJointDebtModel', component: RiskJointDebtModelData}
]


const operatorManageMenuList = [
    {
        title: '常用操作',
        key: '/operatorManage',
        icon: 'tool',
        children: [
            {
                title: '手动销账',
                key: '/removeBill',
                icon: 'delete'
            },
            {
                title: '导出功能1',
                key: '/exportOperator',
                icon: 'export'
            }
            ,
            {
                title: '风控模型分数据',
                key: '/riskControlModel',
                icon: 'export'
            }
            ,
            {
                title: '风控共债信息',
                key: '/riskJointDebtModel',
                icon: 'export'
            }
        ]
    }
   
]
const operatorManageState = combineReducers({
    removeBillState,
    riskControlModelDataState,
    riskJointDebtModelDataState,
})

function* operatorManageSaga() {
    yield all([
        fork(removeBillSaga),
        fork(riskControlModelDataSaga),
        fork(riskJointDebtModelDataSage),
    ])
}

export { operatorManageRoutes, operatorManageMenuList, operatorManageState, operatorManageSaga };