import { put, call, takeEvery, all, fork } from "redux-saga/effects";
import {
    OSC2_GET_TABLE_DATA,
    osc2ChangeTableLoading,
    osc2SetTableData,
    OSC2_GET_TIMING_DISTRUBUTION,
    osc2SetTimingDistribution,
    osc2ChangeTimingDistributionLoading,
} from "./actions";
import { getOverdueStatisic2Data, getOverdueStatisic2TimingDistribution } from "../api";

//获取统计列表
function* getTableData (action) {
    yield put(osc2ChangeTableLoading(true));
    try {
        const res = yield call(getOverdueStatisic2Data, action.params);
        const { content, totalElements, number, size } = res;
        const obj = {
            data: content || [],
            pagination: {
                total: totalElements,
                current: content.length === 0 ? 0 : number + 1,
                pageSize: size,
            },
        };
        yield put(osc2SetTableData(obj));
    } catch (e) {
        console.log(e);
    }
    yield put(osc2ChangeTableLoading(false));
}

function* watchGetTableData () {
    yield takeEvery(OSC2_GET_TABLE_DATA, getTableData);
}

function* getTimingDistribution (action) {
    yield put(osc2ChangeTimingDistributionLoading(true));
    try {
        const res = yield call(getOverdueStatisic2TimingDistribution, action.params);
        if (res.response) return;
        yield put(osc2SetTimingDistribution(res));
    } catch (e) {
        console.log(e);
    }
    yield put(osc2ChangeTimingDistributionLoading(false));
}

function* watchGetTimingDistribution () {
    yield takeEvery(OSC2_GET_TIMING_DISTRUBUTION, getTimingDistribution);
}

export default function* root () {
    yield all([fork(watchGetTableData)]),
    yield all([fork(watchGetTimingDistribution)])
}
