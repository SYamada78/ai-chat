# AI Chat

エンターテイメント向けAIチャットボット

## 概要

Next.js App Router + Hono + Prisma + MongoDB + Claude APIを使用したフレンドリーで親しみやすいAIチャットボットアプリケーション。

## 技術スタック

### フロントエンド
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- React Hooks

### バックエンド
- Hono
- Prisma ORM
- Node.js

### データベース
- MongoDB (MongoDB Atlas)

### AI
- Claude API (Anthropic)

## プロジェクト構成

```
ai-chat/
├── frontend/          # Next.jsフロントエンド
├── backend/           # Honoバックエンド
├── docs/             # ドキュメント
├── CLAIDE.md         # プロジェクト仕様書
├── TODO.md           # 実行計画・TODOリスト
└── MONGODB_SETUP.md  # MongoDB Atlasセットアップガイド
```

## セットアップ

詳細なセットアップ手順は `TODO.md` を参照してください。

### 前提条件

- Node.js 18以上
- npm または yarn
- MongoDB Atlas アカウント
- Claude API Key

### 環境変数

プロジェクトルートに `.env` ファイルを作成し、以下の環境変数を設定してください:

```env
DATABASE_URL="mongodb+srv://..."
CLAUDE_API_KEY="sk-ant-..."
```

## 開発

```bash
# フロントエンド
cd frontend
npm install
npm run dev

# バックエンド
cd backend
npm install
npm run dev
```

## ドキュメント

- [CLAIDE.md](./CLAIDE.md) - プロジェクト仕様書
- [TODO.md](./TODO.md) - 実行計画とTODOリスト
- [MONGODB_SETUP.md](./MONGODB_SETUP.md) - MongoDB Atlasセットアップガイド

## ライセンス

MIT

## 作成日

2026-01-03
