# 間｜MA

立ち止まること。余白を残すこと。すぐに、意味を求めないこと。

「間｜MA」は、日本語の「間」という概念を起点に、立ち止まること、余白を持つことの価値を扱うメディアのポータルサイトです。

## サイト構成

- **YouTube** — テーマトーク・ドキュメンタリー
- **Podcast** — 対話の音声アーカイブ
- **Journal** — エッセイ・文字起こし記事（Note）

## 技術スタック

- [Next.js](https://nextjs.org/) 16 (App Router / Static Export)
- [Tailwind CSS](https://tailwindcss.com/) v4
- TypeScript
- GitHub Pages でホスティング

## フォント

- **日本語:** しっぽり明朝
- **欧文:** EB Garamond

## 開発

```bash
npm install
npm run dev
```

http://localhost:3000 で確認できます。

## ビルド・デプロイ

`main` ブランチへの push で GitHub Actions が自動実行され、GitHub Pages にデプロイされます。

```bash
npm run build  # out/ に静的ファイルを生成
```

## コンテンツ管理

`content/` ディレクトリの JSON ファイルでコンテンツを管理しています。

| ファイル | 内容 |
|---|---|
| `youtube.json` | YouTube 動画データ |
| `podcast.json` | Podcast エピソードデータ |
| `note.json` | Note 記事データ |

## ライセンス

Private - Studio Saitama Inc.
