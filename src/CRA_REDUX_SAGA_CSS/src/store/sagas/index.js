import { all, takeLatest } from "redux-saga/effects"
import { ActionTypes } from "../actions"
import * as QuoteSaga from "./quoteSaga"

export default function* appSaga() {
  yield all([
    takeLatest(ActionTypes.GET_RANDOM_QUOTE, QuoteSaga.getRandomQuote)
    // ...more
  ])
}
