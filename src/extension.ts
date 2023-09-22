/* eslint-disable @typescript-eslint/semi */
import * as vscode from "vscode"
import * as fs from "fs"
import callAPI from "./callAPI"
import type { Uri } from "vscode"
import { InfoViewProvider } from "./modules/InfoViewProvider"
import { getFile } from "./modules/getExternalHtml"

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
  howToShowInformationMessage()

  const usernameKey = "errorpad.username"

  const store = context.globalState

  const usernameValue = store.get(usernameKey)

  if (!usernameValue) {
    vscode.window
      .showInputBox({
        title: "Enter your ErrorPad username: ",
        validateInput: (value) => {
          if (value === null || value === undefined || value === "") {
            return "Error"
          }
          return null
        }
      })
      .then((val) => {
        console.log("🚀 ~ file: extension.ts:31 ~ .then ~ val:", val)
        store.update(usernameKey, JSON.stringify(val))
        // store.setKeysForSync([usernameKey])
      })
  } else {
    vscode.window.showInformationMessage(`hi ${usernameValue}`)
  }

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json

  let disposableHelloWorld = vscode.commands.registerCommand(
    "discover-vscode-api.helloWorld",
    async () => {
      // The code you place here will be executed every time your command is executed

      // howToShowInformationMessage()
      // howToGetCurrentWorkspaceFolder()
      // howToOpenProblemsPane()
      // howToCreateFileInCurrentWorkspaceFolder()
      // callAPI()
      howToGetCurrentDiagnostics()
      // getFile()
    }
  )

  context.subscriptions.push(disposableHelloWorld)
  // context.subscriptions.push(disposableRunActionOnFileSave)

  /* const viewProvider = new InfoViewProvider(context.extensionUri)

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      InfoViewProvider.viewType,
      viewProvider
    )
  ) */
}

// This method is called when your extension is deactivated
export function deactivate() {}

const howToShowInformationMessage = () => {
  vscode.window.showInformationMessage("Hello World from discover-vscode-api!")
}

const howToGetCurrentWorkspaceFolder = () => {
  const currentWorkSpaceFolder = vscode.workspace.workspaceFolders?.[0].uri
  console.log(
    `How to get the current workspace folder: ${currentWorkSpaceFolder}`
  )
}

const howToOpenProblemsPane = () => {
  vscode.commands.executeCommand("workbench.action.problems.focus")
}

const howToCreateFileInCurrentWorkspaceFolder = () => {
  const workspacePath = vscode.workspace.workspaceFolders?.[0]?.name

  fs.writeFileSync(
    `${workspacePath}/test.txt`,
    "Hello World from discover-vscode-api!"
  )
  fs.writeFileSync(`${workspacePath}/test.txt`, "What the f..")
}

const howToGetCurrentDocumentURI = () => {
  const currentDocumentURI: Uri = vscode.window.activeTextEditor?.document
    .uri as Uri
  console.log(
    "🚀 ~ file: extension.ts:63 ~ currentDocumentURI:",
    currentDocumentURI
  )
  return currentDocumentURI
}

const howToGetCurrentDiagnostics = () => {
  /* 
      vscode.languages.getDiagnostics() , açık olan tüm dosyalardaki hataları alıyor
  
  */
  const currentDocumentURI: Uri = howToGetCurrentDocumentURI()
  const currentDiagnostics = vscode.languages.getDiagnostics(currentDocumentURI)
  console.log(
    "🚀 ~ file: extension.ts:63 ~ currentDiagnostics:",
    currentDiagnostics
  )
  return currentDiagnostics
}

const howToGetCurrentDocumentLanguageCode = () => {
  return vscode.window.activeTextEditor?.document?.languageId
}

const howToCheckSettings = () => {
  /* 
    python da problems kısmında çıkan mesajlar pylance tarafından veriliyor. Eğer "python.languageServer" -> "Default" veya "Pylance" değilse vermiyor
  
  */
  const settings = vscode.workspace.getConfiguration().get("python")
  return settings
}

vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
  console.log("File Saved!")
  const diags = vscode.languages.getDiagnostics(document.uri).length
  vscode.window.showInformationMessage(
    `total ${diags} diagnostics detected in your currently open file.`
  )
})