const { fc, pc, tspc } = require("./src/components")
const { cra, craClean, craCleanRedux, craCleanReduxThunk, craCleanReduxSaga, addReduxStore, addReduxReducer } = require("./src/cra")

function activate(context) {
  context.subscriptions.push(cra)
  context.subscriptions.push(craClean)
  context.subscriptions.push(craCleanRedux)
  context.subscriptions.push(craCleanReduxThunk)
  context.subscriptions.push(craCleanReduxSaga)
  context.subscriptions.push(addReduxStore)
  context.subscriptions.push(addReduxReducer)
  context.subscriptions.push(fc)
  context.subscriptions.push(pc)
  context.subscriptions.push(tspc)
}

function deactivate() {}

module.exports = { activate, deactivate }
