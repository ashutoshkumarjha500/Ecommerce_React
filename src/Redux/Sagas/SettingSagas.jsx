import { put, takeEvery } from "redux-saga/effects"
import { CREATE_SETTING, CREATE_SETTING_RED, DELETE_SETTING, DELETE_SETTING_RED, GET_SETTING, GET_SETTING_RED, UPDATE_SETTING, UPDATE_SETTING_RED } from "../Constant"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Services/index"

function* createSaga(action) {                                                  //worker
    let response = yield createRecord("setting", action.payload)
    // let response = yield createMultipartRecord("setting",action.payload)
    yield put({ type: CREATE_SETTING_RED, payload: response })
}

function* getSaga() {                                                     //worker
    let response = yield getRecord("setting")
    yield put({ type: GET_SETTING_RED, payload: response })
}

function* updateSaga(action) {                                                  //worker
    yield updateRecord("setting", action.payload)
    yield put({ type: UPDATE_SETTING_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("setting",action.payload)
    // yield put({ type: UPDATE_SETTING_RED, payload: response })
}

function* deleteSaga(action) {                                                  //worker
    yield deleteRecord("setting", action.payload)
    yield put({ type: DELETE_SETTING_RED, payload: action.payload })
}


export default function* SettingSagas() {
    yield takeEvery(CREATE_SETTING, createSaga)                            //Watcher
    yield takeEvery(GET_SETTING, getSaga)                                  //Watcher
    yield takeEvery(UPDATE_SETTING, updateSaga)                            //Watcher
    yield takeEvery(DELETE_SETTING, deleteSaga)                            //Watcher
}