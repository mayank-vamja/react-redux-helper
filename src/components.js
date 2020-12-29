const { window, commands } = require("vscode")
const { existsSync, mkdirSync, writeFileSync, readFileSync } = require("fs")
const { resolve } = require("path")
const { exec } = require("child_process")

const ComponentType = {
  FUNCTIONAL_COMP: 1,
  PURE_COMP: 2,
  TS_PURE_COMP: 3
}

const StyleType = {
  NONE: "NONE",
  CSS: "CSS",
  SCSS: "SCSS"
}

function generateClassName(dirName) {
  if (!dirName) {
    throw new Error("dir name should not be null")
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const nameUnderlineArr = dirName.split("_")

  let stepOneClassName = ""

  for (const name of nameUnderlineArr) {
    stepOneClassName += capitalizeFirstLetter(name)
  }

  let stepTwoClassName = ""
  const nameCrossArr = stepOneClassName.split("-")

  for (const name of nameCrossArr) {
    stepTwoClassName += capitalizeFirstLetter(name)
  }

  return stepTwoClassName
}

function generateComponent(
  componentName,
  fullPath,
  componentType,
  styleType = StyleType.NONE
) {
  if (existsSync(fullPath)) {
    window.showInformationMessage(
      `${componentName} already exists, please choose another name.`
    )
    return
  }

  const className = generateClassName(componentName)
  console.log(`class name: ${className}`)

  mkdirSync(fullPath)

  let fcTemplate, pcTemplate, tsPcTemplate, styleTemplate

  if (styleType === StyleType.NONE) {
    fcTemplate = resolve(__dirname, "./file_template/fc.txt")
    pcTemplate = resolve(__dirname, "./file_template/pc.txt")
    tsPcTemplate = resolve(__dirname, "./file_template/tspc.txt")
  } else if (styleType === StyleType.CSS) {
    fcTemplate = resolve(__dirname, "./file_template/fc-css.txt")
    pcTemplate = resolve(__dirname, "./file_template/pc-css.txt")
    tsPcTemplate = resolve(__dirname, "./file_template/tspc-css.txt")
    styleTemplate = resolve(__dirname, "./file_template/css.css")
    const styleFile =
      styleType === StyleType.CSS
        ? resolve(`${fullPath}/index.css`)
        : resolve(`${fullPath}/index.scss`)
    writeFileSync(styleFile, readFileSync(styleTemplate, { encoding: "utf-8" }))
  } else {
    fcTemplate = resolve(__dirname, "./file_template/fc-scss.txt")
    pcTemplate = resolve(__dirname, "./file_template/pc-scss.txt")
    tsPcTemplate = resolve(__dirname, "./file_template/tspc-scss.txt")
    styleTemplate = resolve(__dirname, "./file_template/scss.scss")
    const styleFile =
      styleType === StyleType.CSS
        ? resolve(`${fullPath}/index.css`)
        : resolve(`${fullPath}/index.scss`)
    writeFileSync(styleFile, readFileSync(styleTemplate, { encoding: "utf-8" }))
  }

  let jsFile =
    componentType === ComponentType.TS_PURE_COMP
      ? resolve(`${fullPath}/index.tsx`)
      : resolve(`${fullPath}/index.js`)
  let jsFileContent

  if (componentType === ComponentType.FUNCTIONAL_COMP) {
    jsFileContent = readFileSync(fcTemplate, { encoding: "utf-8" })
  } else if (componentType === ComponentType.PURE_COMP) {
    jsFileContent = readFileSync(pcTemplate, { encoding: "utf-8" })
  } else if (componentType === ComponentType.TS_PURE_COMP) {
    jsFileContent = readFileSync(tsPcTemplate, { encoding: "utf-8" })
  }

  writeFileSync(jsFile, jsFileContent.replace(/ClassName/g, className))

  exec(`cd ${fullPath} && git add .`, (err) => {
    if (err) {
      console.log("command fail:", "git add .")
    } else {
      console.log("command success:", "git add .")
    }
  })

  window.showInformationMessage("component created successfully!")
}

const fc = commands.registerCommand(
  "extension_rrh.createFunctionalComponent",
  function (param) {
    const folderPath = param.fsPath
    const options = {
      prompt: "Please input the component name: ",
      placeHolder: "Component Name"
    }

    window.showInputBox(options).then((value) => {
      if (!value) return

      const componentName = value
      const fullPath = `${folderPath}/${componentName}`

      window
        .showQuickPick(["NONE", "CSS", "SCSS"], { canPickMany: false })
        .then(
          (value) =>
            generateComponent(
              componentName,
              fullPath,
              ComponentType.FUNCTIONAL_COMP,
              value
            ),
          () =>
            generateComponent(
              componentName,
              fullPath,
              ComponentType.FUNCTIONAL_COMP
            )
        )
    })
  }
)

const pc = commands.registerCommand(
  "extension_rrh.createPureComponent",
  function (param) {
    const folderPath = param.fsPath

    const options = {
      prompt: "Please input the component name: ",
      placeHolder: "Component Name"
    }

    window.showInputBox(options).then((value) => {
      if (!value) return

      const componentName = value
      const fullPath = `${folderPath}/${componentName}`

      window
        .showQuickPick(["NONE", "CSS", "SCSS"], { canPickMany: false })
        .then(
          (value) =>
            generateComponent(
              componentName,
              fullPath,
              ComponentType.FUNCTIONAL_COMP,
              value
            ),
          () =>
            generateComponent(
              componentName,
              fullPath,
              ComponentType.FUNCTIONAL_COMP
            )
        )
    })
  }
)

const tspc = commands.registerCommand(
  "extension_rrh.createTsPureComponent",
  function (param) {
    const folderPath = param.fsPath

    const options = {
      prompt: "Please input the component name: ",
      placeHolder: "Component Name"
    }

    window.showInputBox(options).then((value) => {
      if (!value) return

      const componentName = value
      const fullPath = `${folderPath}/${componentName}`

      window
        .showQuickPick(["NONE", "CSS", "SCSS"], { canPickMany: false })
        .then(
          (value) =>
            generateComponent(
              componentName,
              fullPath,
              ComponentType.FUNCTIONAL_COMP,
              value
            ),
          () =>
            generateComponent(
              componentName,
              fullPath,
              ComponentType.FUNCTIONAL_COMP
            )
        )
    })
  }
)

module.exports = { fc, pc, tspc }
