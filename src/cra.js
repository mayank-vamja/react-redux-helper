const { commands, window, ProgressLocation, Uri, workspace } = require("vscode")
const { exec } = require("child_process")
const { cleanReactApp, cleanReactReduxApp, cleanReactReduxThunkApp, cleanReactReduxSagaApp, addStore, addReducer } = require("./utils/cra-utils")

const stylePickerOptions = ["CSS", "SCSS"]
const stylePickerConfig = {
  canPickMany: false,
  placeHolder: "Choose style template for your project"
}

const cra = commands.registerCommand("extension_rrh.createReactApp", async () => {
  const options = {
    canSelectFiles: false,
    canSelectFolders: true,
    canSelectMany: false,
    title: "Select Folder Location"
  }

  const uri = await window.showOpenDialog(options)
  if (!uri) return

  const optionsIB = {
    prompt: "Please type React app name (without space or special characters): ",
    placeHolder: "App Name"
  }

  const value = await window.showInputBox(optionsIB)
  if (!value) return

  if (/^[A-Za-z0-9-_]{1,}$/.test(value)) {
    let oc = window.createOutputChannel("REACT-REDUX-HELPER")
    oc.show()
    oc.appendLine("Executing create-react-app (may take few minutes)")

    var child = exec(`cd ${uri[0].fsPath.replace(/\\/g, "/")} && npx create-react-app ${value.toLowerCase()}`)

    window.withProgress(
      {
        location: ProgressLocation.Notification,
        cancellable: true,
        title: "Creating React App"
      },
      async (progress, token) => {
        token.onCancellationRequested(() => {
          oc.append("User cancelled the operation")
          child.kill()
        })
        await new Promise((resolve) => {
          child.stdout.on("data", (data) => {
            oc.append(data.toString())
          })

          child.on("exit", (code) => {
            oc.appendLine("Exited with code " + code)
            resolve()
          })

          child.on("close", (code) => {
            oc.appendLine("Finished and exited with code " + code)
            commands.executeCommand("vscode.openFolder", Uri.joinPath(uri[0], `./${value.toLowerCase()}`))
            resolve()
          })
        })
      }
    )
  } else {
    window.showErrorMessage("App name must be valid.(wihtout space and only a-z, 0-9 and -,_ are allowed)")
  }
})

const craClean = commands.registerCommand("extension_rrh.cleanReactApp", () => {
  const folderPath = workspace?.workspaceFolders[0]?.uri?.fsPath
  console.log(folderPath)
  if (!folderPath) {
    window.showInformationMessage("Please open react project in your workspace.")
    return
  }
  window.showQuickPick(stylePickerOptions, stylePickerConfig).then((value) => {
    if (!value) return
    cleanReactApp(folderPath, value)
  })
})

const craCleanRedux = commands.registerCommand("extension_rrh.cleanReactReduxApp", () => {
  const folderPath = workspace?.workspaceFolders[0]?.uri?.fsPath
  console.log(folderPath)
  if (!folderPath) {
    window.showInformationMessage("Please open react project in your workspace.")
    return
  }
  window.showQuickPick(stylePickerOptions, stylePickerConfig).then((value) => {
    if (!value) return
    cleanReactReduxApp(folderPath, value)
  })
})

const craCleanReduxThunk = commands.registerCommand("extension_rrh.cleanReactReduxThunkApp", () => {
  const folderPath = workspace?.workspaceFolders[0]?.uri?.fsPath
  console.log(folderPath)
  if (!folderPath) {
    window.showInformationMessage("Please open react project in your workspace.")
    return
  }
  window.showQuickPick(stylePickerOptions, stylePickerConfig).then((value) => {
    if (!value) return
    cleanReactReduxThunkApp(folderPath, value)
  })
})

const craCleanReduxSaga = commands.registerCommand("extension_rrh.cleanReactReduxSagaApp", () => {
  const folderPath = workspace?.workspaceFolders[0]?.uri?.fsPath
  console.log(folderPath)
  if (!folderPath) {
    window.showInformationMessage("Please open react project in your workspace.")
    return
  }
  window.showQuickPick(stylePickerOptions, stylePickerConfig).then((value) => {
    if (!value) return
    cleanReactReduxSagaApp(folderPath, value)
  })
})

const addReduxStore = commands.registerCommand("extension_rrh.addReduxStore", () => {
  const folderPath = workspace?.workspaceFolders[0]?.uri?.fsPath
  console.log(folderPath)
  if (!folderPath) {
    window.showInformationMessage("Please open react project in your workspace.")
    return
  }
  window
    .showQuickPick(["NONE", "THUNK", "SAGA"], {
      canPickMany: false,
      placeHolder: "Choose your middleware for redux store"
    })
    .then((value) => {
      if (!value) return
      addStore(folderPath, value)
    })
})

const addReduxReducer = commands.registerCommand("extension_rrh.addReducer", async () => {
  const folderPath = workspace?.workspaceFolders[0]?.uri?.fsPath
  console.log(folderPath)
  if (!folderPath) {
    window.showInformationMessage("Please open react project in your workspace.")
    return
  }
  const optionsIB = {
    prompt: "Please type Reducer name (without space | just type 'sell' for 'sellReducer', no need to type Reducer word): ",
    placeHolder: "Reducer Name"
  }
  const value = await window.showInputBox(optionsIB)
  if (!value) return
  if (/^[a-zA-Z_]{1,}[a-zA-Z_0-9]*$/.test(value)) {
    addReducer(folderPath, value.replace("Reducer", ""))
  } else window.showInformationMessage("Invalid Reducer name [only a-z, A-Z, 0-9, _ are allowed].")
})

module.exports = {
  cra,
  craClean,
  craCleanRedux,
  craCleanReduxSaga,
  craCleanReduxThunk,
  addReduxStore,
  addReduxReducer
}
