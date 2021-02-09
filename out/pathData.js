"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathData = void 0;
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
function pathData() {
    let workspace = vscode.workspace.rootPath;
    if (!workspace) {
        vscode.window.showErrorMessage("Please open a workspace.");
        return;
    }
    let testEditor = path.join(workspace, "example.txt");
    if (!fs.existsSync(testEditor)) {
        vscode.window.showErrorMessage("Cannot find example.txt in top folder.");
        return;
    }
    return fs.readFileSync(testEditor, "utf-8");
}
exports.pathData = pathData;
//# sourceMappingURL=pathData.js.map