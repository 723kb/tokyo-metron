# ①課題番号-プロダクト名

トーキョーめとろん

## ②課題内容（どんな作品か）

#### 東京メトロの運行状況を**LINE通知**できるアプリ。

- ログインすることで各路線の運行状況に対してコメントすることができる。
- コメントにはいいねをつけることができる。
- お気に入りに登録した路線は通知設定を行うことで、通知を受け取ることができる。
- 通知は以下の2種類。
1. **時間帯通知**
   - 指定された時間内に運行状況に変化があれば、最新の運行状況を通知する。
   - 変化がない場合は通知されない。

2. **必須通知**
   - 指定された時間の運行状況を必ず通知する。
   - 遅延などがない場合でも通知が行われる。

| 通知タイプ | 説明 | 通知のタイミング |
|------------|------|------------------|
| 時間帯通知 | 運行状況の変化を通知 | 指定時間内で変化があった時のみ |
| 必須通知   | 運行状況を必ず通知   | 指定時間に必ず |

## ③DEMO

https://723kb.jp/

## ④作ったアプリケーション用のIDまたはPasswordがある場合

企画書フォームに記載しているため割愛。

## ⑤工夫した点・こだわった点

- 使用頻度の高いLINEに通知されるようLINE Notifyと連携した。
- APIへアクセスするタイミングやDBからデータを削除する等、Laravelのスケジュール機能を活用した。
- フロントはBladeではなくInertia.jsを使用し、Laravelプロダクト内でReactで制作した。

## ⑥難しかった点・次回トライしたいこと(又は機能)

1. **Laravel の学習曲線**
   - 基本的な知識不足により、何をするにしても苦しんだ。
   - 日々の学習で徐々に理解が深まったが、さらなる復習が必要。

2. **React と Inertia.js の組み合わせ**
   - React 単体だけでなく、Inertia.js の知識も必要で苦しんだ。

3. **設計の難しさ**
   - DB設計や画面設計に時間をかけたが、多くの変更が必要となり設計の難しさを痛感した。

4. **API 連携の複雑さ**
   - 2種類の API を使用したが、連携プロセスの理解に苦労した。
   - API についてより体系的な学習が必要。

### 未実装・修正点

- メールアドレス検証の強化：実在するアドレスのみ登録可能に
- パスワードリセット機能：Mailpit を使用したリセットメール送信
- LINE Notify 連携ボタンの表示制御の改善
- コードのリファクタリング
  - 長いコードの整理
  - コンポーネントの単一責任原則に基づく再構成

### 今後の展望

1. TypeScript への移行
2. SMS 認証によるログイン機能の実装
3. 都営地下鉄への対応拡大

## ⑦質問・疑問・感想、シェアしたいこと等なんでも

- 最初から最後までLaravelが苦しかった。フレームワークを使うメリットがわからなかったが、スケジュール機能を使い出したあたりから便利さに気づき、もっと使いこなせるようになりたいと思った。
- さくらサーバー（結局失敗に終わる）、LightSailどちらでもデプロイできるようになり良い経験であった。<br>ドメインの当て方やHTTPS化を自分の力でできたことが自信につながった。

### 使用技術

| カテゴリ | 技術/サービス |
|---------|--------------|
| バックエンド | PHP (Laravel) |
| フロントエンド | React |
| データベース | MySQL |
| フレームワーク連携 | Inertia.js |
| 外部サービス | 公共交通オープンデータAPI (ODPT API), LINE Notify API |
