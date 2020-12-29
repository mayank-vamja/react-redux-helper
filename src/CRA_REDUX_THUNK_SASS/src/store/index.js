import { applyMiddleware, compose, createStore } from "redux"
import appReducer from "./reducers"
import thunk from "redux-thunk"

const middlewares = [thunk]
const enhancer = (process.env.NODE_ENV === "development"
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose
  : compose)(applyMiddleware(...middlewares))

export default createStore(appReducer, enhancer)
