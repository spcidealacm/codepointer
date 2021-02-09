"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = void 0;
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
class Data {
    constructor() { }
    static getData() {
        let testEditor = path.join(vscode.workspace.rootPath ? vscode.workspace.rootPath : "", "example.txt");
        return fs.readFileSync(testEditor, "utf-8");
    }
    static analysisData() {
    }
}
exports.Data = Data;
//# sourceMappingURL=AnalysisData.js.map