import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import {
    GET_TODAY_TEAM_REPORT_TABLE_DATA,
    GET_TODAY_COLLECT_TEAM_DATA,
    GET_DOWNLOAD_TODAY_TEAM_REPORT,
    setTableData,
    setCollectTeam,
    setDownloadCollectReport,
    changeTableLoading
} from './actions';

import { getCollectTeamsList, getCollectReport, getCollectReportDownload } from '../api';

function* getTableData(action) {
    yield put(changeTableLoading(true));
    try {
        const res = yield call(getCollectReport, action.params);
        yield put(setTableData(res));

    } catch (e) {
        console.log(e);
    }
    yield put(changeTableLoading(false));
}

function* watchGetTableData() {
    yield takeEvery(GET_TODAY_TEAM_REPORT_TABLE_DATA, getTableData);
}

function* getCollectTeamData(action) {
    try {
        const res = yield call(getCollectTeamsList, action.params);
        yield put(setCollectTeam(res));

    } catch (e) {
        console.log(e);
    }
}

function* watchGetCollectTeam() {
    yield takeEvery(GET_TODAY_COLLECT_TEAM_DATA, getCollectTeamData);
}


function* downloadCollectReport(action) {
    try {
        const res = yield call(getCollectReportDownload, action.params);
        yield put(setDownloadCollectReport(res));
    } catch (e) {
        console.log(e);
    }
}

function* watchDownloadCollectReport() {
    yield takeEvery(GET_DOWNLOAD_TODAY_TEAM_REPORT, downloadCollectReport);
}


export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchGetCollectTeam),
        fork(watchDownloadCollectReport),

    ])
}
