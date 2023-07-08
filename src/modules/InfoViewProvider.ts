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

    webviewView.webview.html = await getWebviewContent(
      this._extensionUri,
      webviewView
    );
  }
}

async function getWebviewContent(
  extensionUri: vscode.Uri,
  webviewView: vscode.WebviewView
): Promise<string> {
  // Return the HTML content for the panel
  try {
    const htmlFileName = "index.html";
    const cssFileName = "index.css";
    const jsFileName = "index.js";

    const htmlPath = path.join(__dirname, "ui", htmlFileName);
    const cssPath = path.join(__dirname, "ui", cssFileName);
    const jsPath = path.join(__dirname, "ui", jsFileName);

    let stringHtml = fs.readFileSync(htmlPath).toString();
    const stringCss = fs.readFileSync(cssPath).toString();
    const stringJs = fs.readFileSync(jsPath).toString();

    stringHtml = stringHtml.replace(
      '<link rel="stylesheet" href="/index.css">',
      `<link  href="/index.css">`
    );
    stringHtml = stringHtml.replace(
      '<script type="module" crossorigin src="/index.js"></script>',
      `<script>${stringJs}</script>`
    );

    console.log(stringHtml);

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
