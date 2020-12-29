import { applyMiddleware, compose, createStore } from "redux"
import appReducer from "./reducers"
import createSagaMiddleware from "redux-saga"
import appSaga from "./sagas"

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]
const enhancer = (process.env.NODE_ENV === "development"
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose
  : compose)(applyMiddleware(...middlewares))

export default createStore(appReducer, enhancer)

sagaMiddleware.run(appSaga)
