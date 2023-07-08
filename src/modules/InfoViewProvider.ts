import * as vscode from "vscode";
import * as fs from "fs";
import path = require("path");

export class InfoViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "info";
  private _view?: vscode.WebviewView;
  private extensionUri: vscode.Uri | string;
  public webview: vscode.Webview | undefined;

  constructor(private readonly _extensionUri: vscode.Uri) {
    this.extensionUri = _extensionUri;
  }

  public async resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,
      localResourceRoots: [this._extensionUri]
    };

    webviewView.webview.html = getWebviewContent(this._extensionUri);
  }
}

function getWebviewContent(extensionUri: vscode.Uri): string {
  // Return the HTML content for the panel
  try {
    const htmlFileName = "index.html";
    const htmlPath = path.join(__dirname, htmlFileName);
    const stringHtml = fs.readFileSync(htmlPath).toString();
    return stringHtml;
  } catch (e) {
    console.log(e);

    return `
        <html>
        <body>
            <h1>Error occured when getting ui.html file!</h1>
        </body>
        </html>
    `;
  }
}
