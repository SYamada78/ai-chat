# AIチャットボット 仕様書
Version: 1.0
作成日: 2026-01-03

---

## 1. プロジェクト概要

### 1.1 プロジェクト名
AIチャットボット (AI Chat)

### 1.2 目的
ユーザーが楽しく会話できるエンターテイメント性を重視したAIチャットボットの開発

### 1.3 ターゲットユーザー
- 一般ユーザー
- AIとの会話を楽しみたい人
- 気軽にコミュニケーションを取りたい人

### 1.4 プロジェクト目標
- ユーザーフレンドリーな対話体験の提供
- 会話履歴の保存と管理
- レスポンシブで快適なWebアプリケーション

---

## 2. 技術スタック

### 2.1 フロントエンド
- **フレームワーク**: Next.js 14+ (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **状態管理**: React Hooks + Context API
- **UIコンポーネント**: カスタムコンポーネント（モダン・ミニマルデザイン）

### 2.2 バックエンド
- **フレームワーク**: Hono
- **ランタイム**: Node.js
- **ORM**: Prisma
- **API形式**: REST API

### 2.3 データベース
- **種類**: MongoDB
- **接続**: Prisma MongoDB Connector

### 2.4 AI / 外部サービス
- **AIモデル**: Claude API (Anthropic)
- **モデル**: Claude 3.5 Sonnet または Claude 3 Opus

### 2.5 デプロイ (未定)
- 候補: Vercel, AWS, GCP, Azure
- フロントエンド: Vercel / Netlify
- バックエンド: Vercel Serverless Functions / Cloud Run / Lambda
- データベース: MongoDB Atlas

---

## 3. システムアーキテクチャ

### 3.1 全体構成
```
┌─────────────────┐
│   ユーザー      │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────┐
│   Next.js Frontend          │
│   (App Router)              │
│   - チャットUI              │
│   - 会話履歴表示            │
└────────┬────────────────────┘
         │ API Request
         ▼
┌─────────────────────────────┐
│   Hono Backend API          │
│   - リクエスト処理          │
│   - Claude API連携          │
│   - 会話履歴管理            │
└────────┬────────────────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌────────┐ ┌──────────────┐
│MongoDB │ │ Claude API   │
│        │ │ (Anthropic)  │
└────────┘ └──────────────┘
```

### 3.2 ディレクトリ構成
```
ai-chat/
├── frontend/                # Next.js フロントエンド
│   ├── src/
│   │   ├── app/            # App Router
│   │   │   ├── page.tsx    # メインチャット画面
│   │   │   ├── layout.tsx
│   │   │   └── api/        # API Routes (オプション)
│   │   ├── components/     # Reactコンポーネント
│   │   │   ├── Chat/
│   │   │   │   ├── ChatMessage.tsx
│   │   │   │   ├── ChatInput.tsx
│   │   │   │   └── ChatWindow.tsx
│   │   │   └── Layout/
│   │   ├── hooks/          # カスタムフック
│   │   ├── lib/            # ユーティリティ
│   │   ├── types/          # TypeScript型定義
│   │   └── styles/         # グローバルスタイル
│   ├── public/             # 静的ファイル
│   ├── package.json
│   ├── tsconfig.json
│   └── tailwind.config.js
│
├── backend/                 # Hono バックエンド
│   ├── src/
│   │   ├── index.ts        # エントリーポイント
│   │   ├── routes/         # APIルート
│   │   │   ├── chat.ts
│   │   │   └── history.ts
│   │   ├── services/       # ビジネスロジック
│   │   │   ├── claude.service.ts
│   │   │   └── chat.service.ts
│   │   ├── middlewares/    # ミドルウェア
│   │   ├── utils/          # ユーティリティ
│   │   └── types/          # TypeScript型定義
│   ├── prisma/
│   │   └── schema.prisma   # Prismaスキーマ
│   ├── package.json
│   └── tsconfig.json
│
├── docs/                    # ドキュメント
├── .gitignore
└── README.md
```

---

## 4. 機能要件

### 4.1 必須機能

#### 4.1.1 リアルタイムチャット機能
- ユーザーがテキストメッセージを入力できる
- Claude APIを使用してAIが応答を生成
- メッセージの送受信をリアルタイムで表示
- ストリーミング応答対応（可能であれば）

#### 4.1.2 会話履歴保存
- 各会話をデータベースに保存
- セッションごとに会話を管理
- 過去の会話を読み込み・表示可能

#### 4.1.3 シンプルなUI
- モダン・ミニマルデザイン
- レスポンシブデザイン（PC、タブレット、スマホ対応）
- ダークモード対応（オプション）

### 4.2 オプション機能（将来的な拡張）
- ユーザー認証機能
- 複数会話セッション管理
- メッセージの編集・削除
- 会話のエクスポート機能
- 音声入力対応
- 画像アップロード対応

---

## 5. 非機能要件

### 5.1 パフォーマンス
- 初回ページロード時間: 3秒以内
- AI応答開始時間: 2秒以内
- 同時接続ユーザー数: 10人（初期目標）

### 5.2 セキュリティ
- API Keyの安全な管理（環境変数）
- HTTPS通信の強制
- CORS設定の適切な管理
- 入力値のバリデーション
- XSS、SQLインジェクション対策

### 5.3 可用性
- 稼働率: 99%以上（目標）
- エラーハンドリングの実装
- ユーザーへの適切なエラーメッセージ表示

### 5.4 保守性
- コードの可読性を重視
- TypeScriptによる型安全性
- コメントとドキュメントの充実
- テストコードの作成

---

## 6. データモデル

### 6.1 データベーススキーマ (Prisma)

```prisma
// schema.prisma

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Conversation {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  title     String?  @default("新しい会話")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  messages  Message[]
}

model Message {
  id             String       @id @default(auto()) @map("_id") @db.ObjectId
  conversationId String       @db.ObjectId
  conversation   Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)
  role           String       // "user" or "assistant"
  content        String
  createdAt      DateTime     @default(now())
}
```

### 6.2 エンティティ説明

#### Conversation (会話)
- `id`: 会話の一意識別子
- `title`: 会話のタイトル（オプション）
- `createdAt`: 作成日時
- `updatedAt`: 更新日時
- `messages`: この会話に属するメッセージ一覧

#### Message (メッセージ)
- `id`: メッセージの一意識別子
- `conversationId`: 所属する会話のID
- `role`: 送信者の役割（"user" または "assistant"）
- `content`: メッセージ本文
- `createdAt`: 作成日時

---

## 7. API設計

### 7.1 エンドポイント一覧

#### 7.1.1 チャット関連

**POST /api/chat**
- 説明: 新しいメッセージを送信し、AI応答を取得
- リクエストボディ:
```json
{
  "conversationId": "string (optional)",
  "message": "string"
}
```
- レスポンス:
```json
{
  "conversationId": "string",
  "userMessage": {
    "id": "string",
    "role": "user",
    "content": "string",
    "createdAt": "datetime"
  },
  "assistantMessage": {
    "id": "string",
    "role": "assistant",
    "content": "string",
    "createdAt": "datetime"
  }
}
```

#### 7.1.2 会話履歴関連

**GET /api/conversations**
- 説明: 全ての会話一覧を取得
- レスポンス:
```json
{
  "conversations": [
    {
      "id": "string",
      "title": "string",
      "createdAt": "datetime",
      "updatedAt": "datetime",
      "messageCount": "number"
    }
  ]
}
```

**GET /api/conversations/:id**
- 説明: 特定の会話の詳細とメッセージ一覧を取得
- レスポンス:
```json
{
  "id": "string",
  "title": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime",
  "messages": [
    {
      "id": "string",
      "role": "string",
      "content": "string",
      "createdAt": "datetime"
    }
  ]
}
```

**DELETE /api/conversations/:id**
- 説明: 会話を削除
- レスポンス:
```json
{
  "success": true,
  "message": "会話を削除しました"
}
```

#### 7.1.3 ヘルスチェック

**GET /api/health**
- 説明: サーバーの稼働状況確認
- レスポンス:
```json
{
  "status": "ok",
  "timestamp": "datetime"
}
```

---

## 8. UI/UXデザイン

### 8.1 デザインコンセプト
- **モダン・ミニマル**: 無駄を省いたシンプルなデザイン
- **フレンドリー**: 親しみやすいトーンとカラー
- **直感的**: 説明不要で使えるインターフェース

### 8.2 カラーパレット
- プライマリカラー: #4F46E5 (Indigo)
- セカンダリカラー: #06B6D4 (Cyan)
- 背景色: #FFFFFF (白) / #F9FAFB (薄いグレー)
- テキスト色: #111827 (ダークグレー)
- アクセント: #10B981 (緑)

### 8.3 主要画面

#### 8.3.1 メインチャット画面
```
┌─────────────────────────────────────────┐
│  AI Chat            [新規会話] [履歴]   │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ こんにちは！何かお話しましょう！ │ AI │
│  └─────────────────────────────────┘    │
│                                         │
│    ┌───────────────────────────┐        │
│    │ 今日はいい天気ですね       │ User  │
│    └───────────────────────────┘        │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ そうですね！お出かけ日和ですね│ AI │
│  └─────────────────────────────────┘    │
│                                         │
├─────────────────────────────────────────┤
│ [メッセージを入力...]          [送信]   │
└─────────────────────────────────────────┘
```

#### 8.3.2 会話履歴画面
- 過去の会話一覧を表示
- 各会話の最初のメッセージをプレビュー
- クリックで会話を読み込み

### 8.4 レスポンシブデザイン
- デスクトップ（1024px以上）: 2カラムレイアウト（サイドバー + チャット）
- タブレット（768px-1023px）: 1カラム、トグルでサイドバー
- モバイル（768px未満）: 完全1カラム、ボトムナビゲーション

---

## 9. セキュリティ要件

### 9.1 API Key管理
- Claude API Keyは環境変数で管理
- `.env`ファイルを`.gitignore`に追加
- 本番環境では環境変数として設定

### 9.2 入力バリデーション
- メッセージ長の制限（例: 最大5000文字）
- 特殊文字のエスケープ処理
- 不正なリクエストの拒否

### 9.3 レート制限
- APIエンドポイントにレート制限を実装
- ユーザーあたり1分間に20リクエストまで（例）

### 9.4 CORS設定
- 許可するオリジンを明示的に設定
- 本番環境では厳密に制限

---

## 10. テスト計画

### 10.1 単体テスト
- ユーティリティ関数のテスト
- APIエンドポイントのテスト
- Reactコンポーネントのテスト

### 10.2 結合テスト
- フロントエンド ↔ バックエンド間の通信テスト
- Claude APIとの連携テスト
- データベースへのCRUD操作テスト

### 10.3 E2Eテスト
- ユーザーシナリオに基づいた全体フローのテスト
- メッセージ送信から応答受信までの一連の流れ

### 10.4 テストツール
- フロントエンド: Jest, React Testing Library, Playwright
- バックエンド: Jest, Supertest

---

## 11. デプロイ計画

### 11.1 デプロイ環境（候補）

#### オプション1: Vercel + MongoDB Atlas
- フロントエンド: Vercel
- バックエンド: Vercel Serverless Functions
- データベース: MongoDB Atlas
- 利点: 簡単なセットアップ、自動デプロイ

#### オプション2: AWS構成
- フロントエンド: S3 + CloudFront
- バックエンド: ECS / Lambda
- データベース: MongoDB Atlas / DocumentDB
- 利点: スケーラビリティ、柔軟性

### 11.2 環境分離
- 開発環境（development）
- ステージング環境（staging）
- 本番環境（production）

### 11.3 CI/CD
- GitHub Actionsによる自動テスト・デプロイ
- mainブランチへのpushで自動デプロイ

---

## 12. 開発フェーズ

### Phase 1: 環境構築・基盤整備
- プロジェクトセットアップ
- Next.js + Hono + Prismaの初期設定
- MongoDB接続設定
- 基本的なディレクトリ構成の作成

### Phase 2: バックエンド開発
- Prismaスキーマ定義
- Claude API連携の実装
- チャットAPIエンドポイントの実装
- 会話履歴APIの実装

### Phase 3: フロントエンド開発
- UIコンポーネントの作成
- チャット画面の実装
- API連携の実装
- レスポンシブデザインの適用

### Phase 4: テスト・最適化
- 単体テスト実装
- E2Eテスト実装
- パフォーマンス最適化
- バグ修正

### Phase 5: デプロイ・運用
- デプロイ環境の設定
- 本番デプロイ
- モニタリング設定
- ドキュメント整備

---

## 13. 制約事項・前提条件

### 13.1 制約事項
- Claude APIの利用制限に準拠
- 会話履歴は各ユーザーのブラウザセッションに紐づく（認証なし）
- 初期バージョンではユーザー認証機能は実装しない

### 13.2 前提条件
- Node.js 18以上
- MongoDB 5.0以上
- Claude API Keyの取得
- インターネット接続環境

---

## 14. リスクと対策

### 14.1 技術的リスク
- **リスク**: Claude APIの応答遅延
  - **対策**: タイムアウト設定、ローディング表示、ストリーミング対応

- **リスク**: データベース接続エラー
  - **対策**: リトライ処理、接続プーリング、エラーハンドリング

- **リスク**: 大量アクセス時のパフォーマンス低下
  - **対策**: レート制限、キャッシング、スケーリング戦略

### 14.2 運用リスク
- **リスク**: API利用料金の増大
  - **対策**: 利用制限の設定、モニタリング、アラート設定

- **リスク**: 不適切なコンテンツの生成
  - **対策**: Claude APIの安全機能活用、コンテンツフィルタリング

---

## 15. 今後の拡張案

- ユーザー認証機能（OAuth、メールアドレス認証）
- マルチユーザー対応
- 会話のシェア機能
- カスタムプロンプト・ペルソナ設定
- 音声入力・出力機能
- 画像アップロード・分析機能
- モバイルアプリ版の開発
- 多言語対応
- テーマカスタマイズ機能

---

## 16. 参考資料

### 16.1 公式ドキュメント
- Next.js: https://nextjs.org/docs
- Hono: https://hono.dev/
- Prisma: https://www.prisma.io/docs
- Claude API: https://docs.anthropic.com/

### 16.2 関連リンク
- TypeScript: https://www.typescriptlang.org/
- Tailwind CSS: https://tailwindcss.com/
- MongoDB: https://www.mongodb.com/docs/

---

## 変更履歴

| バージョン | 日付 | 変更内容 | 担当者 |
|----------|------|----------|--------|
| 1.0 | 2026-01-03 | 初版作成 | - |

---

**仕様書作成者**: AI Assistant
**承認者**: 未定
**次回レビュー予定**: 未定
