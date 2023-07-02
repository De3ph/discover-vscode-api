import * as vscode from "vscode"
import * as fs from "fs"

export class InfoViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "info"
  private _view?: vscode.WebviewView

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [this._extensionUri]
    }

    webviewView.webview.html = getWebviewContent()
  }
}

function getWebviewContent() {
  // Return the HTML content for the panel
  return `
        <html>
        <body>
            <h1>Custom View</h1>
            <p>This is a custom view in Visual Studio Code.</p>
        </body>
        </html>
    `
}
