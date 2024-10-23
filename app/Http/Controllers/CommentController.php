<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\StatusUpdate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * コメントを保存する
     *
     * @param Request $request リクエストオブジェクト
     * @param int $lineId 路線ID
     * @param int $postId 投稿ID
     * @return void
     */
    public function store(Request $request, $lineId, $postId)
    {
        // リクエストデータのバリデーション
        $request->validate([
            'content' => 'required|string|max:255',
        ]);

        // 路線IDと投稿IDに基づいてStatusUpdateを取得
        $statusUpdate = StatusUpdate::where('line_id', $lineId)
            ->findOrFail($postId);

        // 新しいCommentオブジェクトを作成し、内容と現在のユーザーIDを設定
        $comment = new Comment([
            'content' => $request->content,
            'user_id' => Auth::id(),
        ]);

        // StatusUpdateに関連付けてコメントを保存
        $statusUpdate->comments()->save($comment);

        // 新しいコメントを含む更新された状態を返す
        return back()->with('message', 'コメントしました！');
    }

    /**
     * コメントを削除する
     *
     * @param Comment $comment 削除対象のコメント
     * @return void
     */
    public function destroy(Comment $comment)
    {
        // 現在のユーザーがコメントの投稿者かチェック
        if (Auth::id() !== $comment->user_id) {
            abort(403);  // 違ったら403エラー（Forbidden）を返す
        }

        $comment->delete();

        // 成功メッセージとともに元のページにリダイレクト
        return redirect()->back()->with('message', 'コメントを削除しました');
    }

    /**
     * 特定の路線に関連するコメント数を取得する
     *
     * @param int $lineId 路線ID
     * @return void
     * 主にフロントエンドでのコメント数表示に使用
     */
    public function getCommentCountForLine($lineId)
    {
        // 指定された路線IDに関連するすべてのStatusUpdateを取得
        $commentCount = StatusUpdate::where('line_id', $lineId)
            ->withCount('comments')  //  各StatusUpdateに関連するコメント数をカウント
            ->get()
            ->sum('comments_count');  // すべてのStatusUpdateのコメント数の合計を計算

        // 結果をJSON形式で返す
        return response()->json(['comment_count' => $commentCount]);
    }
}
