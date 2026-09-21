import { put, takeEvery } from "redux-saga/effects"
import { CREATE_USER, CREATE_USER_RED, DELETE_USER, DELETE_USER_RED, GET_USER, GET_USER_RED, UPDATE_USER, UPDATE_USER_RED } from "../Constant"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Services/index"

function* createSaga(action) {                                                  //worker
    let response = yield createRecord("user", action.payload)
    // let response = yield createMultipartRecord("user",action.payload)
    yield put({ type: CREATE_USER_RED, payload: response })
}

function* getSaga() {                                                     //worker
    let response = yield getRecord("user")
    yield put({ type: GET_USER_RED, payload: response })
}

function* updateSaga(action) {                                                  //worker
    yield updateRecord("user", action.payload)
    yield put({ type: UPDATE_USER_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("user",action.payload)
    // yield put({ type: UPDATE_USER_RED, payload: response })
}

function* deleteSaga(action) {                                                  //worker
    yield deleteRecord("user", action.payload)
    yield put({ type: DELETE_USER_RED, payload: action.payload })
}


export default function* UserSagas() {
    yield takeEvery(CREATE_USER, createSaga)                            //Watcher
    yield takeEvery(GET_USER, getSaga)                                  //Watcher
    yield takeEvery(UPDATE_USER, updateSaga)                            //Watcher
    yield takeEvery(DELETE_USER, deleteSaga)                            //Watcher
}