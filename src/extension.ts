import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from "fs";
import { Data } from "./Data";


export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('codepointer.helloWorld', () => {
		console.log(Data.analysis());
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }