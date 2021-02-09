"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const Data_1 = require("./Data");
function activate(context) {
    let disposable = vscode.commands.registerCommand('codepointer.helloWorld', () => {
        console.log(Data_1.Data.analysis());
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map