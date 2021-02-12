import * as vscode from 'vscode';
import { Tag } from "./LineTag";


export function activate(context: vscode.ExtensionContext) {

	let tag = new Tag();
	tag.on(vscode.window.visibleTextEditors);
	vscode.window.onDidChangeVisibleTextEditors(
		function (editors: vscode.TextEditor[]) {
			tag.off();
			tag.on(editors);
		}, null, context.subscriptions
	);

	vscode.workspace.onDidChangeTextDocument(
		function (doc: vscode.TextDocumentChangeEvent) {
			tag.off();
			tag.on(vscode.window.visibleTextEditors);
		}
	);
}

export function deactivate() { }