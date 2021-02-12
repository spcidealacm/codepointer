import { cachedDataVersionTag } from "v8";
import * as vscode from "vscode";
import { Data, DataType } from "./Data";

class Tag {
    decorationNodesData: vscode.DecorationRenderOptions = {
        overviewRulerColor: "rgba(255,189,42,0.8)",
        light: { border: "2px solid #000" },
        dark: { border: "2px solid #fff" }
    };

    decorationNodeType: vscode.TextEditorDecorationType | null = null;
    on(editors: vscode.TextEditor[]) {
        if (this.decorationNodeType) { return; }
        this.decorationNodeType = vscode.window.createTextEditorDecorationType(this.decorationNodesData);
        for (let editor of editors) {
            editor.setDecorations(this.decorationNodeType, this.range(Data.compare(editor)));
        }
    }

    off() {
        this.decorationNodeType?.dispose();
        this.decorationNodeType = null;
    }

    range(info: DataType[][]): vscode.Range[] {
        let result: vscode.Range[] = [];
        for (let i in info) {
            for (let j in info[i]) {
                let item: DataType = info[i][j];
                let start = new vscode.Position(item["ln"], item["cl"]);
                let end = new vscode.Position(item["ln"], item["cl"] + 1);
                result.push(new vscode.Range(start, end));
            }
        }
        console.log(result);
        return result;
    }
}

export { Tag };