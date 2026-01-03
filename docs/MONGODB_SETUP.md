# MongoDB Atlas セットアップガイド

このガイドでは、AIチャットボットプロジェクト用のMongoDB Atlasアカウントとクラスターをセットアップする手順を説明します。

---

## 📝 セットアップ手順

### ステップ1: アカウント作成

1. **MongoDB Atlasにアクセス**
   - ブラウザで https://www.mongodb.com/cloud/atlas/register にアクセス

2. **アカウント登録**
   - メールアドレスを入力
   - パスワードを設定（8文字以上、大文字・小文字・数字を含む）
   - 「Create your Atlas account」をクリック

   または
   - Googleアカウントでサインアップ

3. **メール認証**
   - 登録したメールアドレスに送られてくる確認メールを開く
   - 「Verify Email」ボタンをクリック

### ステップ2: プロジェクトのセットアップ

1. **初回ログイン後の質問に回答**（スキップ可能）
   - 使用目的: "Build a new application" を選択
   - プログラミング言語: "JavaScript" を選択
   - 経験レベル: お好みで選択

2. **プロジェクト名の設定**
   - プロジェクト名: `ai-chat` または任意の名前
   - 「Next」または「Continue」をクリック

### ステップ3: 無料クラスターの作成

1. **クラスタープランの選択**
   - 「Create a deployment」または「Build a Database」をクリック
   - **M0 (FREE)** プランを選択
   - 他のプランは有料なので注意！

2. **クラウドプロバイダーとリージョンの選択**
   - Provider: **AWS** を推奨（Google Cloud や Azure でも可）
   - Region: **Tokyo (ap-northeast-1)** を選択（日本から最も近い）
     - Tokyoが選択できない場合は「Singapore」や「Osaka」を選択
   - 「Create Deployment」または「Create」をクリック

3. **認証情報の作成**
   - Username: 任意のユーザー名を入力（例: `admin` または `chatbot-user`）
   - Password: 自動生成されたパスワードをコピーして保存
     - ⚠️ **このパスワードは後で確認できないため、必ず安全な場所に保存してください**
   - 「Create Database User」をクリック

### ステップ4: ネットワークアクセスの設定

1. **IPアドレスのホワイトリスト設定**
   - 「Where would you like to connect from?」画面で以下のいずれかを選択:

   **オプション1: 開発用（簡単だが本番非推奨）**
   - 「My Local Environment」を選択
   - 「Add My Current IP Address」をクリック
   - さらに、「IP Access List」に `0.0.0.0/0` を追加（すべてのIPを許可）
     - Description: `Allow all (development only)`
     - ⚠️ セキュリティリスクあり。本番環境では使用しないこと

   **オプション2: 本番推奨（安全）**
   - デプロイ先のIPアドレスを追加
   - Vercelなどは動的IPのため、適切な設定が必要

   - 「Finish and Close」をクリック

### ステップ5: 接続文字列の取得

1. **Database画面に移動**
   - 左サイドバーの「Database」をクリック
   - 作成したクラスター（通常 Cluster0）が表示される

2. **接続方法の選択**
   - クラスターの「Connect」ボタンをクリック
   - 「Drivers」を選択（アプリケーションから接続）

3. **ドライバーの選択**
   - Driver: **Node.js** を選択
   - Version: 最新版（5.5 or later など）を選択

4. **接続文字列のコピー**
   - 表示される接続文字列をコピー
   - 形式: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

5. **接続文字列の編集**
   - `<password>` の部分を、ステップ3で保存したパスワードに置き換え
   - データベース名を追加:
     ```
     mongodb+srv://username:yourpassword@cluster0.xxxxx.mongodb.net/ai-chat?retryWrites=true&w=majority
     ```
     - `/ai-chat?` の部分でデータベース名を指定

### ステップ6: 接続文字列の保存

1. **環境変数ファイルに保存**
   - このプロジェクトで後ほど `.env` ファイルを作成します
   - その際に以下の形式で保存:
   ```
   DATABASE_URL="mongodb+srv://username:yourpassword@cluster0.xxxxx.mongodb.net/ai-chat?retryWrites=true&w=majority"
   ```

2. **安全に保管**
   - 接続文字列には認証情報が含まれるため、絶対にGitにコミットしないこと
   - `.env` ファイルは `.gitignore` に必ず追加すること

---

## ✅ セットアップ完了チェックリスト

- [x] MongoDB Atlasアカウントの作成
- [x] メールアドレスの認証
- [x] プロジェクトの作成
- [x] M0 (FREE) クラスターの作成
- [x] データベースユーザーの作成とパスワードの保存
- [x] IPアドレスのホワイトリスト設定
- [x] 接続文字列の取得とパスワードの置き換え
- [x] データベース名（ai-chat）の追加
- [x] 接続文字列の安全な保存

---

## 🔍 接続文字列の例

```
mongodb+srv://chatbot-user:MySecurePassword123@cluster0.abc1de.mongodb.net/ai-chat?retryWrites=true&w=majority
```

**構成要素:**
- `chatbot-user`: ユーザー名
- `MySecurePassword123`: パスワード
- `cluster0.abc1de.mongodb.net`: クラスターのホスト名
- `ai-chat`: データベース名
- `retryWrites=true&w=majority`: オプション設定

---

## 🛠️ トラブルシューティング

### 接続エラーが発生する場合

1. **パスワードの特殊文字エンコード**
   - パスワードに `@`, `#`, `%` などの特殊文字が含まれる場合、URLエンコードが必要
   - 例: `p@ssw0rd` → `p%40ssw0rd`

2. **IPアドレスの確認**
   - 現在のIPアドレスがホワイトリストに含まれているか確認
   - https://www.whatismyip.com/ で自分のIPを確認

3. **ネットワーク接続**
   - ファイアウォールやVPNが接続をブロックしていないか確認

### クラスターが表示されない

- ページをリロード
- 別のブラウザで試す
- 数分待ってから再度確認（クラスター作成には2-3分かかる場合あり）

---

## 📚 参考リンク

- MongoDB Atlas公式ドキュメント: https://www.mongodb.com/docs/atlas/
- Prisma with MongoDB: https://www.prisma.io/docs/concepts/database-connectors/mongodb
- 接続文字列の詳細: https://www.mongodb.com/docs/manual/reference/connection-string/

---

## 🔐 セキュリティのベストプラクティス

1. **強力なパスワードを使用**
   - 最低12文字以上
   - 大文字・小文字・数字・記号を組み合わせる

2. **IPホワイトリストを適切に設定**
   - 開発中: 自分のIPアドレスのみ
   - 本番環境: デプロイ先のIPアドレスのみ

3. **接続文字列を安全に管理**
   - 環境変数として保存
   - Gitにコミットしない
   - チームで共有する場合は安全な方法で（1Password, LastPassなど）

4. **定期的な監視**
   - MongoDB Atlasのダッシュボードで接続ログを確認
   - 不審なアクセスがないかチェック

---

**セットアップが完了したら、取得した接続文字列を安全な場所にメモして、プロジェクトのセットアップ時に使用してください。**
