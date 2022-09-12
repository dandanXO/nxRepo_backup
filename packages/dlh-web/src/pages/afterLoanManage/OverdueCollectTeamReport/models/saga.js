import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import {
    GET_OVERDUE_TEAM_REPORT_TABLE_DATA,
    GET_OVERDUE_COLLECT_TEAM_DATA,
    GET_DOWNLOAD_OVERDUE_TEAM_REPORT,
    setTableData,
    setCollectTeam,
    setDownloadCollectReport
} from './actions';
import { getCollectTeamsList, getCollectReport, getCollectReportDownload } from '../api';

function* getTableData(action) {
    try {
        const res = yield call(getCollectReport, action.params);
        yield put(setTableData(res));

    } catch (e) {
        console.log(e);
    }
}

function* watchGetTableData() {
    yield takeEvery(GET_OVERDUE_TEAM_REPORT_TABLE_DATA, getTableData);
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
    yield takeEvery(GET_OVERDUE_COLLECT_TEAM_DATA, getCollectTeamData);
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
    yield takeEvery(GET_DOWNLOAD_OVERDUE_TEAM_REPORT, downloadCollectReport);
}


export default function* root() {
    yield all([
        fork(watchGetTableData),
        fork(watchGetCollectTeam),
        fork(watchDownloadCollectReport),

    ])
}
