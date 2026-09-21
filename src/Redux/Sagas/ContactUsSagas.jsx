import { put, takeEvery } from "redux-saga/effects"
import { CREATE_CONTACT_US, CREATE_CONTACT_US_RED, DELETE_CONTACT_US, DELETE_CONTACT_US_RED, GET_CONTACT_US, GET_CONTACT_US_RED, UPDATE_CONTACT_US, UPDATE_CONTACT_US_RED } from "../Constant"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Services/index"

function* createSaga(action) {                                                  //worker
    let response = yield createRecord("contactus", action.payload)
    // let response = yield createMultipartRecord("contactus",action.payload)
    yield put({ type: CREATE_CONTACT_US_RED, payload: response })
}

function* getSaga() {                                                     //worker
    let response = yield getRecord("contactus")
    yield put({ type: GET_CONTACT_US_RED, payload: response })
}

function* updateSaga(action) {                                                  //worker
    yield updateRecord("contactus", action.payload)
    yield put({ type: UPDATE_CONTACT_US_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("contactus",action.payload)
    // yield put({ type: UPDATE_CONTACT_US_RED, payload: response })
}

function* deleteSaga(action) {                                                  //worker
    yield deleteRecord("contactus", action.payload)
    yield put({ type: DELETE_CONTACT_US_RED, payload: action.payload })
}


export default function* ContactUsSagas() {
    yield takeEvery(CREATE_CONTACT_US, createSaga)                            //Watcher
    yield takeEvery(GET_CONTACT_US, getSaga)                                  //Watcher
    yield takeEvery(UPDATE_CONTACT_US, updateSaga)                            //Watcher
    yield takeEvery(DELETE_CONTACT_US, deleteSaga)                            //Watcher
}