# Date Markdown Creator

現在の日付を名前とするMarkdownファイルを簡単に作成できるVSCode拡張機能です。

## 機能

- エクスプローラーでファイルまたはフォルダを選択
- `cmd+m`（macOS）または `ctrl+m`（Windows/Linux）を押下
- `yyyymmdd.md`形式のファイルが自動的に作成されます
- 同名ファイルが存在する場合は、自動的に連番が付与されます（例：`20260103_1.md`）

## 使い方

### 基本的な使い方

1. VSCodeのエクスプローラーでファイルまたはフォルダを選択
2. キーボードショートカットを押下：
   - macOS: `cmd+m`
   - Windows/Linux: `ctrl+m`
3. 現在の日付を名前とするMarkdownファイルが作成され、エディタで開かれます

### ファイル作成場所

- **フォルダを選択した場合**: そのフォルダ内に作成
- **ファイルを選択した場合**: そのファイルと同じディレクトリに作成
- **何も選択していない場合**: ワークスペースのルートディレクトリに作成

### ファイル名の形式

- 基本形式: `yyyymmdd.md`（例：`20260103.md`）
- 重複時: `yyyymmdd_n.md`（例：`20260103_1.md`, `20260103_2.md`）

## インストール

### VSIXファイルからインストール

1. **古いバージョンをアンインストール（既にインストールしている場合）**
   ```bash
   rm -rf ~/.vscode/extensions/ktgrryt.vscode-date-md-*
   ```

2. **VSCodeを完全に終了**
   - すべてのウィンドウを閉じる
   - `Cmd+Q`（macOS）でVSCodeを完全に終了

3. **新しいVSIXをインストール**
   - VSCodeを起動
   - `Cmd+Shift+P`（Windows/Linux: `Ctrl+Shift+P`）
   - 「Extensions: Install from VSIX...」を選択
   - `vscode-date-md-0.0.2.vsix` を選択

4. **VSCodeを再起動**

## 要件

- Visual Studio Code 1.80.0 以上

## 開発

### セットアップ

```bash
# 依存関係のインストール
npm install

# コンパイル
npm run compile

# ウォッチモード（自動コンパイル）
npm run watch
```

### デバッグ

1. VSCodeでこのプロジェクトを開く
2. F5キーを押してデバッグモードで起動
3. 新しいVSCodeウィンドウで拡張機能をテスト

### VSIXファイルの作成

```bash
# vsceをインストール（初回のみ）
npm install -g @vscode/vsce

# VSIXファイルを作成
vsce package
```

## トラブルシューティング

### キーバインドが動作しない

`cmd+m`が他の拡張機能と競合している可能性があります。VSCodeの設定でキーバインドをカスタマイズできます：

1. `Cmd+K Cmd+S`（Windows/Linux: `Ctrl+K Ctrl+S`）でキーボードショートカット設定を開く
2. 「Create Date Markdown File」を検索
3. 別のキーバインドに変更（例：`cmd+shift+m`）

### インストール後に動作しない

1. VSCodeを完全に再起動してください
2. 拡張機能ビュー（`Cmd+Shift+X`）で「Date Markdown Creator」が有効になっているか確認
3. 古いバージョンが残っている場合は、完全にアンインストールしてから再インストール

## バージョン履歴

### 0.0.2
- Publisher名を`ktgrryt`に変更
- エクスプローラーのコンテキストメニューに追加

### 0.0.1
- 初回リリース
- 基本的なファイル作成機能
- 連番付与機能

## ライセンス

MIT

## 作者

ktgrryt
