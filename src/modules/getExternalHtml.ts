import * as path from "path";
import * as vscode from "vscode";
import * as fs from "node:fs";

export function getFile() {
  const file = fs.readFileSync("/fe/a.txt").toString();
  console.log("🚀 ~ file: getExternalHtml.ts:8 ~ getFile ~ file:", file);
}
