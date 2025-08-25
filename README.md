# NAZUNA ENGEKI 5th Anniversary Web

演劇祭向けの動画公開サイト。トップ（オープニング）と動画公開ページの2ページで構成。  
デプロイは GitHub Pages を使用し、カスタムドメインは https://video.ichigak-engeki5.com/ を想定。

- オープニング（/index.html）
  - タイトル「NAZUNA ENGEKI 5th Anniversary」の上をスポットライトが横断
  - 隠しギミック: 「NAZUNA」の「A」を押すと舞台裏写真をモーダル表示
  - GAS 連携は不要
- 動画公開ページ（/index/video.html）
  - 中央に動画、その下に説明
  - 隠しギミック: フッター「©2025 NAZUNA ENGEKI5」の「5」を5回押すと緞帳が閉まり、専用画面を表示
  - 発動時に GAS へ POST（回数集計）。1端末につき一度のみ（LocalStorage）

## 前提・制約

- 物理ファイルは最小構成のみ
  - /index.html
  - /index/video.html
  - /images/IMG_...（舞台裏写真、動画ファイルも images 配下に置く前提）
- 追加の外部 JS/CSS は作らず、すべて各 HTML 内にインライン実装
- GAS Web アプリの URL は video.html 内に直接記載
- GitHub Pages で公開し、カスタムドメインを設定（video.ichigak-engeki5.com）

## 公開 URL

- トップ: https://video.ichigak-engeki5.com/
- 動画: https://video.ichigak-engeki5.com/index/video.html

## ディレクトリ構成（最小）

```
/
├─ index.html
├─ style.css
├─ index/
│  ├─ video.html
|   ├─ samsumnail.jpg
|   └─video.mp4
└─ images/
   ├─ IMG_...   # 舞台裏写真
```

## セットアップ

1) アセット配置
- 舞台裏写真を /images/IMG_backstage.jpg に配置（ファイル名は index.html に合わせて修正可）
- 動画を直接アップロードする形式をとっている

2) GAS（Google Apps Script）
- Web アプリとしてデプロイ（アクセス権: 全員）
- 発行された URL を /index/video.html 内の関数 GAS_WEB_APP_URL の欄に貼り付け
- スプレッドシート ID を設定

3) ローカル確認
- オープニングのスポットライトと A 押下モーダル、動画ページの 5 回タップ → 緞帳 → 専用画面 まで確認

## デプロイ（GitHub Pages + カスタムドメイン）

1) リポジトリへ commit/push  
2) GitHub > Settings > Pages  
   - Source: Deploy from a branch（例: main / root）  
3) Custom domain に video.ichigak-engeki5.com を設定  
4) DNS 設定  
   - CNAME: video.ichigak-engeki5.com → <username>.github.io  
5) Enforce HTTPS を有効化  
6) 反映後、上記の公開 URL を確認

## テスト項目

- オープニング
  - スポットライトが横方向にスイープする
  - 「NAZUNA」の「A」を押すと舞台裏写真のモーダルが開く
- 動画ページ
  - 動画が再生できる（videoタグ)
  - フッターの「5」を5回押すと緞帳が閉まり専用画面表示
  - 2回目以降は同端末・同ブラウザでは発動しない
  - 発動時に GAS に記録が残る

## セキュリティ・運用

- LocalStorage による「一度のみ」制御は、ブラウザごと・ストレージ消去で再発動可能（運用上の割り切り）
- GAS 側では、重複記録の扱いをスプレッドシート上で整理
- Web アプリは JSON を返し、CORS で問題ないことを確認
- HTTPS 有効（動画の自動再生・CORS 安定のため）


## 備考

- 1端末一度のみの発動は LocalStorage 制御のため、別ブラウザやストレージ消去で再発動可能
- 開発者用として画面右下に LocalStorageを消去するためのボタンがある
- パスワードは`nazuna-engeki-5`
- GitHub Pages では上記のように絶対パス（/index/video.html 等）で参照する前提で、リポジトリ直下に配置してください
- 動画サイズが大きい場合はエンコード（H.264/AAC, 720p/1080p, 適切なビットレート）を検討してください
- 
- GAS プロジェクトURL
- `https://script.google.com/d/1JCWXcb7LXVl9glEAN8W-4L0flK960jGvtcVOZAglBemkBpgKIWTkq_u7/edit?usp=sharing`
- スプレッドシートURL
- `https://docs.google.com/spreadsheets/d/1_2QyyoNMO0gD0yLoFfE-Mpp6iIVawZ98xnlTRsFss-Y/edit?usp=sharing`

---

## License

This project is licensed under the MIT License - see the [LICENSE](https://raw.githubusercontent.com/J105588/video-nazuna/refs/heads/main/LICENSE) file for details.

## Copyright

Copyright (c) 2025 J.J.X.

*Last updated: 2025-08-25*
