# AIチャットボット 実行計画・TODOリスト

作成日: 2026-01-03
参照: CLAIDE.mc 仕様書

---

## 📋 プロジェクト概要

Next.js App Router + Hono + Prisma + MongoDB + Claude APIを使用したエンターテイメント向けAIチャットボットの開発

---

## 🎯 Phase 0: 事前準備

### 環境・アカウント準備
- [x] Node.js 18以上のインストール確認 ✅ v24.4.1
- [x] Git のインストール確認 ✅ v2.50.1
- [x] エディタ（VS Code等）のセットアップ
- [x] Claude API Keyの取得 ✅ 取得済み
  - [x] Anthropicアカウント作成
  - [x] APIキーの発行
  - [x] 利用制限・料金プランの確認
- [x] MongoDB Atlas アカウント作成 ✅ 完了
  - [x] 無料クラスターの作成
  - [x] データベースユーザーの作成
  - [x] IPアドレスのホワイトリスト設定
  - [x] 接続文字列の取得

### 開発環境準備
- [x] GitHubリポジトリの作成 ✅ https://github.com/SYamada78/ai-chat
- [x] ローカルマシンの開発環境確認 ✅
- [ ] 必要なVS Code拡張機能のインストール（オプション）
  - [ ] ESLint
  - [ ] Prettier
  - [ ] Tailwind CSS IntelliSense
  - [ ] Prisma

---

## 🏗️ Phase 1: プロジェクトセットアップ

### 1.1 プロジェクト構造の作成
- [ ] プロジェクトルートディレクトリの作成
- [ ] `frontend/` ディレクトリの作成
- [ ] `backend/` ディレクトリの作成
- [ ] `.gitignore` ファイルの作成
- [ ] `README.md` の作成

### 1.2 フロントエンド（Next.js）のセットアップ
- [ ] Next.js プロジェクトの初期化
  ```bash
  cd frontend
  npx create-next-app@latest . --typescript --tailwind --app --no-src
  ```
- [ ] 必要な依存パッケージのインストール
  ```bash
  npm install @tanstack/react-query axios date-fns
  npm install -D @types/node
  ```
- [ ] Tailwind CSS の設定確認・調整
- [ ] `tsconfig.json` の設定確認
- [ ] ディレクトリ構造の作成
  - [ ] `app/` (App Router)
  - [ ] `components/`
  - [ ] `hooks/`
  - [ ] `lib/`
  - [ ] `types/`

### 1.3 バックエンド（Hono）のセットアップ
- [ ] Node.js プロジェクトの初期化
  ```bash
  cd backend
  npm init -y
  ```
- [ ] TypeScript の設定
  ```bash
  npm install -D typescript @types/node tsx
  npx tsc --init
  ```
- [ ] Hono と関連パッケージのインストール
  ```bash
  npm install hono
  npm install @hono/node-server
  npm install @anthropic-ai/sdk
  npm install dotenv
  ```
- [ ] Prisma のセットアップ
  ```bash
  npm install prisma @prisma/client
  npx prisma init
  ```
- [ ] `tsconfig.json` の設定
- [ ] ディレクトリ構造の作成
  - [ ] `src/`
  - [ ] `src/routes/`
  - [ ] `src/services/`
  - [ ] `src/middlewares/`
  - [ ] `src/utils/`
  - [ ] `src/types/`

### 1.4 環境変数の設定
- [ ] フロントエンド `.env.local` の作成
  ```
  NEXT_PUBLIC_API_URL=http://localhost:3001
  ```
- [ ] バックエンド `.env` の作成
  ```
  DATABASE_URL="mongodb+srv://..."
  CLAUDE_API_KEY="sk-ant-..."
  PORT=3001
  CORS_ORIGIN=http://localhost:3000
  ```
- [ ] `.env.example` ファイルの作成（両方）

### 1.5 Git リポジトリの初期化
- [ ] `git init` の実行
- [ ] 初回コミット
- [ ] GitHubリポジトリへのプッシュ

---

## 🔧 Phase 2: バックエンド開発

### 2.1 Prisma スキーマ定義
- [ ] `prisma/schema.prisma` の作成
  - [ ] MongoDB プロバイダー設定
  - [ ] Conversation モデルの定義
  - [ ] Message モデルの定義
  - [ ] リレーションの設定
- [ ] Prisma Client の生成
  ```bash
  npx prisma generate
  ```
- [ ] データベースの接続確認

### 2.2 基本的なサーバー構造の実装
- [ ] `src/index.ts` の作成
  - [ ] Hono アプリケーションの初期化
  - [ ] CORS ミドルウェアの設定
  - [ ] エラーハンドリングミドルウェア
  - [ ] サーバーの起動処理
- [ ] 型定義ファイル `src/types/index.ts` の作成
  - [ ] API レスポンス型
  - [ ] リクエストボディ型
  - [ ] エラー型

### 2.3 Prisma クライアントのセットアップ
- [ ] `src/lib/prisma.ts` の作成
  - [ ] シングルトンパターンでPrismaClientを初期化
  - [ ] 接続管理

### 2.4 Claude API サービスの実装
- [ ] `src/services/claude.service.ts` の作成
  - [ ] Anthropic SDK の初期化
  - [ ] メッセージ送信関数の実装
  - [ ] エラーハンドリング
  - [ ] ストリーミング対応（オプション）

### 2.5 チャットサービスの実装
- [ ] `src/services/chat.service.ts` の作成
  - [ ] 新規会話作成機能
  - [ ] メッセージ保存機能
  - [ ] 会話履歴取得機能
  - [ ] Claude API連携処理

### 2.6 API ルートの実装

#### チャットエンドポイント
- [ ] `src/routes/chat.ts` の作成
  - [ ] `POST /api/chat` エンドポイント
    - [ ] リクエストバリデーション
    - [ ] 会話ID の確認・新規作成
    - [ ] ユーザーメッセージの保存
    - [ ] Claude API 呼び出し
    - [ ] AI応答の保存
    - [ ] レスポンス返却
  - [ ] エラーハンドリング

#### 会話履歴エンドポイント
- [ ] `src/routes/conversations.ts` の作成
  - [ ] `GET /api/conversations` - 会話一覧取得
  - [ ] `GET /api/conversations/:id` - 特定会話の詳細取得
  - [ ] `DELETE /api/conversations/:id` - 会話削除
  - [ ] ページネーション対応（オプション）

#### ヘルスチェック
- [ ] `src/routes/health.ts` の作成
  - [ ] `GET /api/health` エンドポイント
  - [ ] データベース接続確認

### 2.7 ミドルウェアの実装
- [ ] `src/middlewares/error.ts` - エラーハンドリング
- [ ] `src/middlewares/validation.ts` - リクエストバリデーション
- [ ] `src/middlewares/rateLimit.ts` - レート制限（オプション）

### 2.8 ユーティリティの実装
- [ ] `src/utils/logger.ts` - ロギング機能
- [ ] `src/utils/response.ts` - レスポンスヘルパー

### 2.9 バックエンドのテスト
- [ ] ローカル環境での起動確認
  ```bash
  npm run dev
  ```
- [ ] ヘルスチェックエンドポイントのテスト
- [ ] Postman/Thunder Client で各APIのテスト
  - [ ] POST /api/chat
  - [ ] GET /api/conversations
  - [ ] GET /api/conversations/:id
  - [ ] DELETE /api/conversations/:id

---

## 🎨 Phase 3: フロントエンド開発

### 3.1 型定義の作成
- [ ] `types/index.ts` の作成
  - [ ] Message 型
  - [ ] Conversation 型
  - [ ] API レスポンス型

### 3.2 API クライアントの実装
- [ ] `lib/api.ts` の作成
  - [ ] Axios インスタンスの設定
  - [ ] チャット送信関数
  - [ ] 会話一覧取得関数
  - [ ] 会話詳細取得関数
  - [ ] 会話削除関数
  - [ ] エラーハンドリング

### 3.3 カスタムフックの実装
- [ ] `hooks/useChat.ts` の作成
  - [ ] メッセージ送信
  - [ ] ローディング状態管理
  - [ ] エラー状態管理
- [ ] `hooks/useConversations.ts` の作成
  - [ ] 会話一覧の管理
  - [ ] 会話の選択・削除
- [ ] `hooks/useMessages.ts` の作成
  - [ ] メッセージリストの管理
  - [ ] 自動スクロール

### 3.4 UI コンポーネントの実装

#### レイアウトコンポーネント
- [ ] `components/Layout/Header.tsx` の作成
  - [ ] アプリタイトル
  - [ ] 新規会話ボタン
  - [ ] 会話履歴ボタン
- [ ] `components/Layout/Sidebar.tsx` の作成
  - [ ] 会話一覧の表示
  - [ ] 会話の選択機能
  - [ ] レスポンシブ対応

#### チャットコンポーネント
- [ ] `components/Chat/ChatMessage.tsx` の作成
  - [ ] ユーザーメッセージの表示
  - [ ] AIメッセージの表示
  - [ ] タイムスタンプ
  - [ ] スタイリング（左右配置、吹き出し）
- [ ] `components/Chat/ChatWindow.tsx` の作成
  - [ ] メッセージリストの表示
  - [ ] 自動スクロール機能
  - [ ] ローディングインジケーター
- [ ] `components/Chat/ChatInput.tsx` の作成
  - [ ] テキストエリア
  - [ ] 送信ボタン
  - [ ] Enter キーでの送信
  - [ ] Shift+Enter で改行
  - [ ] 送信中の無効化

#### その他コンポーネント
- [ ] `components/common/Button.tsx` - 汎用ボタン
- [ ] `components/common/Loading.tsx` - ローディング表示
- [ ] `components/common/ErrorMessage.tsx` - エラー表示

### 3.5 ページの実装
- [ ] `app/page.tsx` - メインチャット画面
  - [ ] ChatWindow コンポーネントの配置
  - [ ] ChatInput コンポーネントの配置
  - [ ] レイアウト構成
- [ ] `app/layout.tsx` - ルートレイアウト
  - [ ] Header の配置
  - [ ] メタデータ設定
  - [ ] フォント設定
  - [ ] グローバルスタイル

### 3.6 スタイリングの実装
- [ ] Tailwind CSS カスタム設定
  - [ ] カラーパレットの定義
  - [ ] カスタムクラスの作成
- [ ] レスポンシブデザインの実装
  - [ ] モバイル対応（~768px）
  - [ ] タブレット対応（768px~1024px）
  - [ ] デスクトップ対応（1024px~）
- [ ] アニメーション・トランジションの追加
  - [ ] メッセージ表示アニメーション
  - [ ] ローディングアニメーション

### 3.7 状態管理の実装
- [ ] React Context の作成（必要に応じて）
  - [ ] ConversationContext
  - [ ] ThemeContext（ダークモード用）
- [ ] ローカルストレージの活用
  - [ ] 最後に開いた会話の保存

### 3.8 フロントエンドのテスト
- [ ] ローカル環境での起動確認
  ```bash
  npm run dev
  ```
- [ ] 各画面の表示確認
- [ ] レスポンシブデザインの確認
- [ ] バックエンドとの連携確認

---

## 🔗 Phase 4: 統合とテスト

### 4.1 フロント・バックエンド統合
- [ ] CORS設定の確認
- [ ] API エンドポイントの疎通確認
- [ ] エラーハンドリングの統合テスト

### 4.2 機能テスト

#### 基本機能
- [ ] 新規会話の作成
- [ ] メッセージの送信
- [ ] AI応答の受信と表示
- [ ] 会話履歴の保存確認

#### 会話管理機能
- [ ] 会話一覧の表示
- [ ] 会話の切り替え
- [ ] 会話の削除
- [ ] 複数会話の管理

#### UI/UX
- [ ] ローディング状態の表示
- [ ] エラーメッセージの表示
- [ ] レスポンシブデザインの動作確認
- [ ] アニメーションのスムーズさ

### 4.3 パフォーマンステスト
- [ ] 初回ページロード時間の計測
- [ ] API レスポンス時間の計測
- [ ] 大量メッセージ時のパフォーマンス確認
- [ ] メモリリークのチェック

### 4.4 セキュリティチェック
- [ ] API Key が露出していないか確認
- [ ] XSS 対策の確認
- [ ] 入力値バリデーションの確認
- [ ] CORS 設定の適切性確認

### 4.5 ブラウザ互換性テスト
- [ ] Chrome での動作確認
- [ ] Firefox での動作確認
- [ ] Safari での動作確認
- [ ] Edge での動作確認
- [ ] モバイルブラウザでの動作確認

### 4.6 バグ修正
- [ ] 発見されたバグのリスト化
- [ ] 優先度付け
- [ ] バグ修正の実施
- [ ] 修正の確認

---

## 🚀 Phase 5: デプロイ準備

### 5.1 本番環境の設定

#### データベース
- [ ] MongoDB Atlas の本番クラスター設定
- [ ] バックアップ設定
- [ ] モニタリング設定

#### 環境変数
- [ ] 本番用環境変数の準備
- [ ] API Key の管理
- [ ] データベース接続文字列

### 5.2 ビルド設定
- [ ] フロントエンドのビルド確認
  ```bash
  npm run build
  ```
- [ ] バックエンドのビルド設定
  ```bash
  npm run build
  ```
- [ ] 本番用スクリプトの作成

### 5.3 デプロイプラットフォームの選択と設定

#### オプション1: Vercel（推奨）
- [ ] Vercelアカウントの作成
- [ ] フロントエンドのデプロイ設定
  - [ ] GitHubリポジトリとの連携
  - [ ] 環境変数の設定
  - [ ] ビルド設定
- [ ] バックエンドのデプロイ（Vercel Serverless Functions）
  - [ ] API ルートの設定
  - [ ] 環境変数の設定

#### オプション2: その他のプラットフォーム
- [ ] プラットフォームの選定
- [ ] デプロイ設定
- [ ] DNS設定

### 5.4 デプロイ実行
- [ ] ステージング環境へのデプロイ
- [ ] ステージング環境でのテスト
- [ ] 本番環境へのデプロイ
- [ ] 本番環境での動作確認

### 5.5 モニタリング・ロギング
- [ ] エラートラッキングの設定（Sentry等）
- [ ] アクセスログの設定
- [ ] パフォーマンスモニタリング
- [ ] アラート設定

### 5.6 ドキュメント整備
- [ ] README.md の更新
  - [ ] プロジェクト概要
  - [ ] セットアップ手順
  - [ ] 開発手順
  - [ ] デプロイ手順
- [ ] API ドキュメントの作成
- [ ] 環境変数一覧の作成
- [ ] トラブルシューティングガイド

---

## 📈 Phase 6: 運用・改善（オプション）

### 6.1 モニタリング
- [ ] 日次でのエラーログ確認
- [ ] パフォーマンスメトリクスの確認
- [ ] ユーザーフィードバックの収集

### 6.2 機能追加・改善
- [ ] ユーザーからの要望の整理
- [ ] 優先度付け
- [ ] 機能追加の実装
- [ ] A/Bテストの実施

### 6.3 将来の拡張機能（CLAIDE.mc参照）
- [ ] ユーザー認証機能
- [ ] 会話のシェア機能
- [ ] カスタムプロンプト設定
- [ ] 音声入力対応
- [ ] 画像アップロード機能
- [ ] 多言語対応
- [ ] テーマカスタマイズ

---

## 📝 メモ・注意事項

### 開発時の注意点
- すべての環境変数は `.env.example` にも記載し、実際の値は除外する
- コミット前に必ず `.env` ファイルが `.gitignore` に含まれているか確認
- API キーは絶対にハードコードしない
- 定期的にコミット・プッシュを行う
- 機能ごとにブランチを切って開発する（feature/chat-ui など）

### トラブルシューティング
- MongoDB 接続エラー: IP ホワイトリストの確認、接続文字列の確認
- Claude API エラー: API キーの確認、利用制限の確認
- CORS エラー: バックエンドの CORS 設定を確認
- ビルドエラー: 依存関係の再インストール `npm install`

### 参考リソース
- Next.js ドキュメント: https://nextjs.org/docs
- Hono ドキュメント: https://hono.dev/
- Prisma ドキュメント: https://www.prisma.io/docs
- Claude API ドキュメント: https://docs.anthropic.com/
- MongoDB Atlas ドキュメント: https://www.mongodb.com/docs/atlas/

---

## ✅ 進捗管理

### 完了したフェーズ
- [x] Phase 0: 事前準備 ✅
- [ ] Phase 1: プロジェクトセットアップ
- [ ] Phase 2: バックエンド開発
- [ ] Phase 3: フロントエンド開発
- [ ] Phase 4: 統合とテスト
- [ ] Phase 5: デプロイ準備

### 現在のフェーズ
**Phase 1: プロジェクトセットアップ**

### 次のアクション
1. ✅ ~~Claude API Key の取得~~ - 完了
2. ✅ ~~MongoDB Atlas のセットアップ~~ - 完了
3. ✅ ~~GitHubリポジトリの作成~~ - 完了
4. Phase 1: プロジェクトセットアップ開始
   - プロジェクトディレクトリの作成
   - フロントエンド（Next.js）のセットアップ
   - バックエンド（Hono）のセットアップ

---

**最終更新日**: 2026-01-03
**バージョン**: 1.3
**更新内容**: Phase 0 完全完了。GitHubリポジトリ作成完了。Phase 1へ
