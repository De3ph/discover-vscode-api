/* eslint-disable @typescript-eslint/semi */
import * as vscode from "vscode"
import * as fs from "fs"
import callAPI from "./callAPI"
import type {Uri} from "vscode"

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "discover-vscode-api" is now active!'
  )
  howToShowInformationMessage()


  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposableHelloWorld = vscode.commands.registerCommand(
    "discover-vscode-api.helloWorld",
    async () => {

      // The code you place here will be executed every time your command is executed
      
      /* 
      howToShowInformationMessage()
      howToGetCurrentWorkspaceFolder()
      howToOpenProblemsPane()
      howToCreateFileInCurrentWorkspaceFolder()
      callAPI()
      howToGetCurrentDiagnostics() 
      */

    }
  )

  context.subscriptions.push(disposableHelloWorld)
}

const howToShowInformationMessage = () => {
  vscode.window.showInformationMessage("Hello World from discover-vscode-api!")
}

const howToGetCurrentWorkspaceFolder = () => {
  const currentWorkSpaceFolder = vscode.workspace.rootPath
  console.log(
    `How to get the current workspace folder: ${currentWorkSpaceFolder}`
  )
}

const howToOpenProblemsPane = () => {
    vscode.commands.executeCommand("workbench.action.problems.focus")
}

const howToCreateFileInCurrentWorkspaceFolder = () => {
  const workspacePath = vscode.workspace.rootPath;

	  fs.writeFileSync(`${workspacePath}/test.txt`, "Hello World from discover-vscode-api!"); 
}

const howToGetCurrentDocumentURI = () => {
  const currentDocumentURI : Uri = vscode.window.activeTextEditor?.document.uri as Uri;
  console.log("🚀 ~ file: extension.ts:63 ~ currentDocumentURI:", currentDocumentURI)
  return currentDocumentURI;
}

const howToGetCurrentDiagnostics = () => {
  const currentDocumentURI : Uri = howToGetCurrentDocumentURI();
  const currentDiagnostics = vscode.languages.getDiagnostics(currentDocumentURI);
  console.log("🚀 ~ file: extension.ts:63 ~ currentDiagnostics:", currentDiagnostics)
  return currentDiagnostics;
}

// This method is called when your extension is deactivated
export function deactivate() {}
