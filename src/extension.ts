import * as vscode from 'vscode';
import * as path from 'path';

/**
 * 拡張機能がアクティベートされたときに呼ばれる
 */
export function activate(context: vscode.ExtensionContext) {
	console.log('vscode-date-md is now active!');

	// コマンドを登録
	const disposable = vscode.commands.registerCommand(
		'vscode-date-md.createDateMarkdown',
		async (uri: vscode.Uri, allUris: vscode.Uri[]) => {
			try {
				// エクスプローラーから呼ばれた場合、uriが渡される
				// キーボードショートカットから呼ばれた場合、uriはundefinedになる可能性がある
				await createDateMarkdownFile(uri);
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : String(error);
				vscode.window.showErrorMessage(`ファイルの作成に失敗しました: ${errorMessage}`);
			}
		}
	);

	context.subscriptions.push(disposable);
}

/**
 * 拡張機能が非アクティベートされたときに呼ばれる
 */
export function deactivate() {}

/**
 * 現在の日付からyyyymmdd形式のファイル名を生成
 */
function generateDateFileName(): string {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const day = String(now.getDate()).padStart(2, '0');
	return `${year}${month}${day}.md`;
}

/**
 * ファイルが存在するかチェック
 */
async function fileExists(uri: vscode.Uri): Promise<boolean> {
	try {
		await vscode.workspace.fs.stat(uri);
		return true;
	} catch {
		return false;
	}
}

/**
 * 重複しないファイル名を取得（連番を付与）
 */
async function getUniqueFileName(dirUri: vscode.Uri, baseName: string): Promise<string> {
	const nameWithoutExt = baseName.replace('.md', '');
	let counter = 0;
	let fileName = baseName;
	let fileUri = vscode.Uri.joinPath(dirUri, fileName);

	// 同名ファイルが存在する場合は連番を付与
	while (await fileExists(fileUri)) {
		counter++;
		fileName = `${nameWithoutExt}_${counter}.md`;
		fileUri = vscode.Uri.joinPath(dirUri, fileName);
	}

	return fileName;
}

/**
 * 指定されたURIからディレクトリのURIを取得
 */
async function getTargetDirectory(uri: vscode.Uri | undefined): Promise<vscode.Uri> {
	// URIが指定されていない場合
	if (!uri) {
		// アクティブなエディタのファイルを使用
		const activeEditor = vscode.window.activeTextEditor;
		if (activeEditor && activeEditor.document.uri.scheme === 'file') {
			uri = activeEditor.document.uri;
		} else {
			// ワークスペースのルートフォルダを使用
			const workspaceFolders = vscode.workspace.workspaceFolders;
			if (workspaceFolders && workspaceFolders.length > 0) {
				// 最初のワークスペースフォルダを使用
				return workspaceFolders[0].uri;
			} else {
				throw new Error('ワークスペースが開かれていません');
			}
		}
	}

	// URIの統計情報を取得してファイルかフォルダか判定
	const stat = await vscode.workspace.fs.stat(uri);
	
	if (stat.type === vscode.FileType.Directory) {
		// フォルダの場合はそのまま返す
		return uri;
	} else {
		// ファイルの場合は親ディレクトリを返す
		return vscode.Uri.file(path.dirname(uri.fsPath));
	}
}

/**
 * 日付のMarkdownファイルを作成
 */
async function createDateMarkdownFile(uri: vscode.Uri | undefined): Promise<void> {
	// ターゲットディレクトリを取得
	const targetDir = await getTargetDirectory(uri);

	// 日付ファイル名を生成
	const baseName = generateDateFileName();

	// 重複しないファイル名を取得
	const uniqueFileName = await getUniqueFileName(targetDir, baseName);

	// ファイルのURIを作成
	const fileUri = vscode.Uri.joinPath(targetDir, uniqueFileName);

	// 空のファイルを作成
	await vscode.workspace.fs.writeFile(fileUri, new Uint8Array());

	// ファイルをエディタで開く
	const document = await vscode.workspace.openTextDocument(fileUri);
	await vscode.window.showTextDocument(document);

	// 成功メッセージを表示
	vscode.window.showInformationMessage(`ファイルを作成しました: ${uniqueFileName}`);
}

// Made with Bob
