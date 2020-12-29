import { put } from "redux-saga/effects"
import { ActionTypes } from "../actions"

export function* getRandomQuote() {
  try {
    const response = yield fetch("http://api.quotable.io/random")
    const data = yield response?.json()
    yield put({ type: ActionTypes.SET_RANDOM_QUOTE, payload: data })
  } catch (error) {
    yield put({ type: ActionTypes.FAILED_RANDOM_QUOTE, payload: error })
  }
}
