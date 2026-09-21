import { put, takeEvery } from "redux-saga/effects"
import { CREATE_CHECKOUT, CREATE_CHECKOUT_RED, DELETE_CHECKOUT, DELETE_CHECKOUT_RED, GET_CHECKOUT, GET_CHECKOUT_RED, UPDATE_CHECKOUT, UPDATE_CHECKOUT_RED } from "../Constant"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Services/index"

function* createSaga(action) {                                                  //worker
    let response = yield createRecord("checkout", action.payload)
    // let response = yield createMultipartRecord("checkout",action.payload)
    yield put({ type: CREATE_CHECKOUT_RED, payload: response })
}

function* getSaga() {                                                     //worker
    let response = yield getRecord("checkout")
    yield put({ type: GET_CHECKOUT_RED, payload: response })
}

function* updateSaga(action) {                                                  //worker
    yield updateRecord("checkout", action.payload)
    yield put({ type: UPDATE_CHECKOUT_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("checkout",action.payload)
    // yield put({ type: UPDATE_CHECKOUT_RED, payload: response })
}

function* deleteSaga(action) {                                                  //worker
    yield deleteRecord("checkout", action.payload)
    yield put({ type: DELETE_CHECKOUT_RED, payload: action.payload })
}


export default function* CheckoutSagas() {
    yield takeEvery(CREATE_CHECKOUT, createSaga)                            //Watcher
    yield takeEvery(GET_CHECKOUT, getSaga)                                  //Watcher
    yield takeEvery(UPDATE_CHECKOUT, updateSaga)                            //Watcher
    yield takeEvery(DELETE_CHECKOUT, deleteSaga)                            //Watcher
}