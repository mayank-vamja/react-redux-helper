const { window } = require("vscode")
const fs = require("fs")
const Path = require("path")

const showSassIntallationMessage = () =>
  window.showInformationMessage("Install 'sass' package if not installed.", "Install").then((s) => {
    if (s !== "Install") return
    const terminal = window.createTerminal("INSTALL SASS")
    terminal.sendText("npm install sass --save-dev")
    terminal.show()
  })

const deleteFolderRecursive = async (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file) =>
      fs.lstatSync(Path.join(path, file)).isDirectory() ? deleteFolderRecursive(Path.join(path, file)) : fs.unlinkSync(Path.join(path, file))
    )
    fs.rmdirSync(path)
  }
}

const copyFileSync = (source, target) => {
  let targetFile = target
  if (fs.existsSync(target)) if (fs.lstatSync(target).isDirectory()) targetFile = Path.join(target, Path.basename(source))
  fs.writeFileSync(targetFile, fs.readFileSync(source))
}

const copyFolderRecursiveSync = (source, target) => {
  let files = []
  let targetFolder = Path.join(target, Path.basename(source))
  if (!fs.existsSync(targetFolder)) fs.mkdirSync(targetFolder)
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source)
    files.forEach((file) =>
      fs.lstatSync(Path.join(source, file)).isDirectory() ? copyFolderRecursiveSync(Path.join(source, file), targetFolder) : copyFileSync(Path.join(source, file), targetFolder)
    )
  }
}

const cleanReactApp = async (folderPath, style = "CSS") => {
  if (!fs.existsSync(Path.resolve(folderPath, "./src"))) {
    window.showInformationMessage("Invalid React Project.")
    return
  }
  await deleteFolderRecursive(Path.resolve(folderPath, "./src"))
  if (style === "SCSS") {
    copyFolderRecursiveSync(Path.resolve(__dirname, "../CRA_SASS/src"), folderPath)
    showSassIntallationMessage()
  } else {
    copyFolderRecursiveSync(Path.resolve(__dirname, "../CRA_CSS/src"), folderPath)
  }
  window.showInformationMessage("Cleaned your react app. Install 'react-router-dom' packages if required.", "Install").then((s) => {
    if (s !== "Install") return
    const terminal = window.createTerminal("REACT_REDUX_HELPER_TERMINAL")
    terminal.sendText("npm install react-router-dom --save")
    terminal.show()
  })
}

const cleanReactReduxApp = async (folderPath, style = "CSS") => {
  if (!fs.existsSync(Path.resolve(folderPath, "./src"))) {
    window.showInformationMessage("Invalid React Project.")
    return
  }
  await deleteFolderRecursive(Path.resolve(folderPath, "./src"))
  if (style === "SCSS") {
    copyFolderRecursiveSync(Path.resolve(__dirname, "../CRA_REDUX_SASS/src"), folderPath)
    showSassIntallationMessage()
  } else {
    copyFolderRecursiveSync(Path.resolve(__dirname, "../CRA_REDUX_CSS/src"), folderPath)
  }
  window.showInformationMessage("Converted your react app into react-redux app. Install 'react-router-dom redux react-redux' packages if required.", "Install").then((s) => {
    if (s !== "Install") return
    const terminal = window.createTerminal("REACT_REDUX_HELPER_TERMINAL")
    terminal.sendText("npm install react-router-dom redux react-redux --save")
    terminal.show()
  })
}

const cleanReactReduxThunkApp = async (folderPath, style = "CSS") => {
  if (!fs.existsSync(Path.resolve(folderPath, "./src"))) {
    window.showInformationMessage("Invalid React Project.")
    return
  }
  await deleteFolderRecursive(Path.resolve(folderPath, "./src"))
  if (style === "SCSS") {
    copyFolderRecursiveSync(Path.resolve(__dirname, "../CRA_REDUX_THUNK_SASS/src"), folderPath)
    showSassIntallationMessage()
  } else {
    copyFolderRecursiveSync(Path.resolve(__dirname, "../CRA_REDUX_THUNK_CSS/src"), folderPath)
  }
  window
    .showInformationMessage("Converted your react app into react-redux app with thunk. Install 'react-router-dom redux react-redux redux-thunk' packages if required.", "Install")
    .then((s) => {
      if (s !== "Install") return
      const terminal = window.createTerminal("REACT_REDUX_HELPER_TERMINAL")
      terminal.sendText("npm install react-router-dom redux react-redux redux-thunk --save")
      terminal.show()
    })
}

const cleanReactReduxSagaApp = async (folderPath, style = "CSS") => {
  if (!fs.existsSync(Path.resolve(folderPath, "./src"))) {
    window.showInformationMessage("Invalid React Project.")
    return
  }
  await deleteFolderRecursive(Path.resolve(folderPath, "./src"))
  if (style === "SCSS") {
    copyFolderRecursiveSync(Path.resolve(__dirname, "../CRA_REDUX_SAGA_SASS/src"), folderPath)
    showSassIntallationMessage()
  } else {
    copyFolderRecursiveSync(Path.resolve(__dirname, "../CRA_REDUX_SAGA_CSS/src"), folderPath)
  }
  window
    .showInformationMessage("Converted your react app into react-redux app with saga. Install 'react-router-dom redux react-redux redux-saga' packages if required.", "Install")
    .then((s) => {
      if (s !== "Install") return
      const terminal = window.createTerminal("REACT_REDUX_HELPER_TERMINAL")
      terminal.sendText("npm install react-router-dom redux react-redux redux-saga --save")
      terminal.show()
    })
}

const addStore = async (folderPath, middleware = "NONE") => {
  if (!fs.existsSync(Path.resolve(folderPath, "./src"))) {
    window.showInformationMessage("Invalid React Project.")
    return
  }
  if (fs.existsSync(Path.resolve(folderPath, "./src/store"))) await deleteFolderRecursive(Path.resolve(folderPath, "./src/store"))
  if (middleware === "THUNK") {
    copyFolderRecursiveSync(Path.resolve(__dirname, "../CRA_REDUX_THUNK_CSS/src/store"), Path.resolve(folderPath, "./src/"))
    window
      .showInformationMessage("Added redux store in your app with thunk. Install 'react-router-dom redux react-redux redux-thunk' packages if required.", "Install")
      .then((s) => {
        if (s !== "Install") return
        const terminal = window.createTerminal("REACT_REDUX_HELPER_TERMINAL")
        terminal.sendText("npm install react-router-dom redux react-redux redux-thunk --save")
        terminal.show()
      })
  }
  if (middleware === "SAGA") {
    copyFolderRecursiveSync(Path.resolve(__dirname, "../CRA_REDUX_SAGA_CSS/src/store"), Path.resolve(folderPath, "./src/"))
    window.showInformationMessage("Added redux store in your app with saga. Install 'react-router-dom redux react-redux redux-saga' packages if required.", "Install").then((s) => {
      if (s !== "Install") return
      const terminal = window.createTerminal("REACT_REDUX_HELPER_TERMINAL")
      terminal.sendText("npm install react-router-dom redux react-redux redux-saga --save")
      terminal.show()
    })
  } else {
    copyFolderRecursiveSync(Path.resolve(__dirname, "../CRA_REDUX_CSS/src/store"), Path.resolve(folderPath, "./src/"))
    window.showInformationMessage("Added redux store in your app. Install 'react-router-dom redux react-redux' packages if required.", "Install").then((s) => {
      if (s !== "Install") return
      const terminal = window.createTerminal("REACT_REDUX_HELPER_TERMINAL")
      terminal.sendText("npm install react-router-dom redux react-redux --save")
      terminal.show()
    })
  }
}

const addReducer = async (folderPath, reducer) => {
  if (!fs.existsSync(Path.resolve(folderPath, "./src/store/reducers"))) {
    window.showInformationMessage("Invalid store structure. It must be /src/store/reducers")
    return
  }
  fs.writeFileSync(
    Path.resolve(folderPath, `./src/store/reducers/${reducer}Reducer.js`),
    fs.readFileSync(Path.resolve(__dirname, "../CRA_REDUCER/reducer.js"), { encoding: "utf-8" })
  )
  let currentReducerData = fs.readFileSync(Path.resolve(folderPath, `./src/store/reducers/index.js`), { encoding: "utf-8" })
  fs.writeFileSync(
    Path.resolve(folderPath, `./src/store/reducers/index.js`),
    `import ${reducer}Reducer from './${reducer}Reducer'\n${currentReducerData.replace("combineReducers({", `combineReducers({\n  ${reducer}: ${reducer}Reducer,`)}`
  )
  window.showInformationMessage("Reducer added successfully")
}

module.exports = {
  cleanReactApp,
  cleanReactReduxApp,
  cleanReactReduxThunkApp,
  cleanReactReduxSagaApp,
  addStore,
  addReducer
}
