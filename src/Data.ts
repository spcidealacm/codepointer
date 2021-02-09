import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from "fs";

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

export { Data };