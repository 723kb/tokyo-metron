<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Like;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    /**
     * 指定されたコメントのいいね状態を取得する
     *
     * @param int $commentId コメントのID
     */
    public function getStatus($commentId)
    {
        // コメントが存在するか確認 findOrFailメソッドで見つからなければ404
        $comment = Comment::findOrFail($commentId);
        $user = Auth::user();
        // ユーザーがこのコメントにいいねしているか確認
        $isLiked = $comment->likes()->where('user_id', $user->id)->exists();
        // コメントの総いいね数を取得
        $likesCount = $comment->likes()->count();

        // いいね状態と総数をJSONレスポンスとして返す
        return response()->json([
            'is_liked' => $isLiked,
            'likes_count' => $likesCount
        ]);
    }

    /**
     * いいねを作成し、データベースに保存する
     * 
     * @param int $commentId コメントのID
     */
    public function store(Request $request, $commentId)
    {
        // コメントが存在するか確認 findOrFailメソッドで見つからなければ404
        $comment = Comment::findOrFail($commentId);
        $user = Auth::user();

        // ユーザーがすでにいいねしているか確認
        $existingLike = Like::where('user_id', $user->id)
            ->where('comment_id', $comment->id)
            ->first();

        if (!$existingLike) {
            // いいねが存在しない場合、新しいいいねを作成
            Like::create([
                'user_id' => $user->id,
                'comment_id' => $comment->id,
            ]);
            // 成功レスポンスを返す（いいね数も含む）
            return response()->json(['message' => 'いいねしました', 'likes_count' => $comment->likes()->count()]);
        }

        // すでにいいねしている場合は409 Conflictエラーを返す
        return response()->json(['message' => 'すでにいいねしています'], 409);
    }

    /**
     * 指定されたいいねをデータベースから削除する
     *
     * @param int $commentId コメントのID
     */
    public function destroy($commentId)
    {
        // コメントが存在するか確認 findOrFailメソッドで見つからなければ404
        $comment = Comment::findOrFail($commentId);
        $user = Auth::user();

        // ユーザーのいいねを検索
        $like = Like::where('user_id', $user->id)
            ->where('comment_id', $comment->id)
            ->first();

        if ($like) {
            // いいねが存在する場合、削除する
            $like->delete();
            // 成功レスポンスを返す（更新後のいいね数も含む）
            return response()->json(['message' => 'いいねを取り消しました', 'likes_count' => $comment->likes()->count()]);
        }

        // いいねが見つからない場合は404 Not Foundエラーを返す
        return response()->json(['message' => 'いいねが見つかりません'], 404);
    }
}
