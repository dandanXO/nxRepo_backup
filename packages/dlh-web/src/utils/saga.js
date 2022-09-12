import { select, put, call } from "redux-saga/effects";

export function* getTableDataWithPagination (entity, apiFn, action) {
    yield put(entity.loading(true));
    try {
        const res = yield call(apiFn,action);
        const { content, totalElements, number, size } = res;
        const obj = {
            data: content || [],
            pagination: {
                total: totalElements,
                current: content.length === 0 ? 0 : number + 1,
                pageSize: size,
            },
        };
        yield put(entity.set(obj));
    } catch (e) {

    }

    yield put(entity.loading(false));
}

export function* getTableData (entity, apiFn, action) {
    yield put(entity.loading(true));
    try {
        const res = yield call(apiFn,action);
        yield put(entity.set(res));
    } catch (e) {
    }
    yield put(entity.loading(false));
}