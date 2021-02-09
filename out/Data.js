"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = void 0;
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
class Data {
    static achieve() {
        return fs.readFileSync(path.join(vscode.workspace.rootPath ? vscode.workspace.rootPath : "", "example.txt"), "utf-8");
    }
    static analysis() {
        let data = Data.achieve();
        let reg1 = RegExp("(\\([^\\)]+\\)\\s*-->\\s*)+\\([^\\)]+\\)", "g");
        let reg2 = RegExp("\\s*ln:\\s*([1-9]\\d*|0)\\s+cl:\\s*([1-9]\\d*|0)\\s+fl:\\s*[^\\)]+", "g");
        let result1, result2, result3, result = [];
        while (result1 = reg1.exec(data)) {
            let subResult = [];
            while (result2 = reg2.exec(result1[0])) {
                result3 = result2[0].split(/\s+/);
                let info = { ln: +result3[1], cl: +result3[3], fl: result3[5] };
                subResult.push(info);
            }
            result.push(subResult);
        }
        return result;
    }
}
exports.Data = Data;
//# sourceMappingURL=Data.js.map