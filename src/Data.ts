import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from "fs";

interface DataType {
    ln: number;
    cl: number;
    fl: string;
    // decoration?: vscode.TextEditorDecorationType;
}

class Data {

    static achieve() {
        return fs.readFileSync(path.join(vscode.workspace.rootPath ? vscode.workspace.rootPath : "", "example.txt"), "utf-8");
    }

    static analysis() {
        let data = this.achieve();
        let reg1 = RegExp("(\\([^\\)]+\\)\\s*-->\\s*)+\\([^\\)]+\\)", "g");
        let reg2 = RegExp("ln:\\s*([1-9]\\d*|0)\\s+cl:\\s*([1-9]\\d*|0)\\s+fl:\\s*[^\\)|^\\s]+", "g");
        let dirname = vscode.workspace.rootPath ? vscode.workspace.rootPath : "";
        let result1, result2, result3, result = [];
        while (result1 = reg1.exec(data)) {
            let subResult = [];
            while (result2 = reg2.exec(result1[0])) {
                result3 = result2[0].replace(/:/g, " ").split(/\s+/);
                let info: DataType = { ln: +result3[1]-1, cl: +result3[3]-1, fl: path.join(dirname, result3[5]) };
                subResult.push(info);
            }
            result.push(subResult);
        }
        return result;
    }

    static compare(editor: vscode.TextEditor) {
        return this.compareFl(editor.document.uri.fsPath);
    }

    static compareFl(info: string) {
        let data = this.analysis();
        let result = []; // [obj[],obj[]]
        for (let i in data) {
            let team = []; // obj[]
            for (let j in data[i]) {
                if (info === data[i][j]["fl"]) {
                    // console.log(team);
                    team.push(data[i][j]); // if info fl equal data[i][j]["fl"], team achieve it.
                } else {
                    if (team.length) { result.push(team); team = []; } // if not and team has obj in, result achieve team, team clear.
                }
            }
            if (team.length) { result.push(team); }
        }
        return result;
    }
}

export { Data, DataType };