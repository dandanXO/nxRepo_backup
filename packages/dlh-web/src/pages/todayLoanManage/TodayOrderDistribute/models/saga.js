import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import {Checkbox, message} from 'antd';
import {
  TOOD_GET_TABLE_DATA,
  toodSetTableData,
  toodChangeTableLoading,
  TOOD_GET_PERSON_DATA,
  toodSetPersonData,
  TOOD_DISTRIBUTE_ORDER,
  toodChangeModalVisible,
  toodChangeSelectKey,
  toodChangePersonType,
  TOOD_GET_TODAY_COLLECTOR,
  toodSetTodayCollector,
} from './actions';
import {getOrderListData, getUrgePersonData, distributeOrder, getTodayCollector} from '../api';
import React from "react";


//获取列表数据
function* getTableData(action) {
    yield put(toodChangeTableLoading(true));
    try{
        const res = yield call(getOrderListData, action.params);
        if(Number(res.code) === 200) {
            const obj = {
                data: res.data || [],
                pagination: {
                    total: res.total,
                    current: res.pageNum
                }
            };
            yield put(toodSetTableData(obj));
            //请求列表数据后将选中的行制空
            yield put(toodChangeSelectKey([]));
        }
    } catch (e) {

    }

    yield put(toodChangeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(TOOD_GET_TABLE_DATA, getTableData);
}

//获取催收人
function* getPerson(action) {
    try{
        const res = yield call(getUrgePersonData, action.params);
        if(Number(res.code) === 200) {
            const { data: content } = res;
            const isGroup = content['type'] === 'group';
            const data = isGroup ? content['departmentList'] : content['mssAdminUserList'];
            const personData = data.map(item => ({ name: isGroup ? item['name'] : item.trueName, value: item.id }));
            yield put(toodChangePersonType(content['type']));
            yield put(toodSetPersonData(personData));
        }
    } catch (e) {

    }
}
function* watchGetPerson() {
    yield takeEvery(TOOD_GET_PERSON_DATA, getPerson);
}
//分配订单
function* distributeData(action) {
    try {
        const res = yield call(distributeOrder, action.params);
        if(Number(res.code) === 200) {
            yield put(toodChangeModalVisible(false));
            message.success('分配成功');
            action.callBack && action.callBack();
        }
    } catch (e) {
        console.log(e);
    }
}
function* watchDistributeData() {
    yield takeEvery(TOOD_DISTRIBUTE_ORDER, distributeData);
}


function* getTodayCollectorSaga() {
  try {
    const response = yield call(getTodayCollector);
    console.log("response", response);

    const treeData = response.map(stage => {
      const newMerchants = stage.merchants.map(merchant => {
        const newTeams = merchant.teams.map(team => {
          const newCollectors = team.collectors.map(collector => {
            collector.title = collector.collectorName;
            collector.title = <Checkbox value={collector.collectorId} key={collector.collectorId} >{`${collector.collectorName}`}</Checkbox>;
            collector.key = collector.collectorId;
            return collector
            // return <Checkbox value={collector.collectorId} key={collector.collectorId} >{`${collector.collectorName}`}</Checkbox>;
          })
          // console.log("newCollectors", newCollectors);
          // team.title = (
          //   <Checkbox.Group style={{
          //     display: "flex",
          //     flexWrap: "wrap-reverse"
          //   }}>
          //     {newCollectors}
          //     {/*<Checkbox value={1} key={`1`} >{`1`}</Checkbox>;*/}
          //     {/*<Checkbox value={1} key={`1`} >{`1`}</Checkbox>;*/}
          //     {/*<Checkbox value={1} key={`1`} >{`1`}</Checkbox>;*/}
          //     {/*<Checkbox value={1} key={`1`} >{`1`}</Checkbox>;*/}
          //     {/*<Checkbox value={1} key={`1`} >{`1`}</Checkbox>;*/}
          //   </Checkbox.Group>
          // )
          team.title = team.team === null ? "[未分类团队]" : "[团队] " + team.team;
          if(team.team === null) team.disableCheckbox = true;
          team.key = team.team;
          return team
        })
        merchant.children = newTeams;
        merchant.title = "[商户] " + merchant.merchant;
        merchant.key = merchant.merchantId;
        return merchant
      })
      stage.children = newMerchants;
      stage.title = stage.stage === "NONE" ? "NONE" : "[阶段] " + stage.stage;
      stage.key = stage.stage;
      return stage;
    })
    // console.log("treeData", treeData);
    yield put(toodSetTodayCollector(treeData));

    } catch (e) {
      console.log(e);
  }
}
function* watchGetTodayCollector() {
  yield  takeEvery(TOOD_GET_TODAY_COLLECTOR, getTodayCollectorSaga)
}
export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchGetPerson),
        fork(watchDistributeData),
        fork(watchGetTodayCollector),
    ])
}
