import React from "react";
import { useForm } from "@inertiajs/react";
import TrashIcon from "./TrashIcon";
import ActionLink from "@/Components/ActionLink";

/**
 * 個別のコメントを表示するコンポーネント
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Object} props.comment - コメントデータ
 * @param {number} props.comment.id - コメントID
 * @param {string} props.comment.content - コメント内容
 * @param {Object} props.comment.user - コメント投稿者情報
 * @param {string} props.comment.user.name - 投稿者名
 * @param {string} props.comment.created_at - コメント投稿日時
 * @param {number} props.currentUserId - 現在ログインしているユーザーのID
 * @param {Function} props.onCommentDeleted - コメント削除時のコールバック関数
 * @returns {JSX.Element} コメント表示コンポーネント
 */
const CommentItem = ({ comment, currentUserId, onCommentDeleted }) => {
    const { delete: destroy } = useForm();

    /**
     * コメント削除処理
     * 確認ダイアログを表示し、OKの場合のみ削除を実行
     */
    const handleDelete = () => {
        if (confirm("本当にこのコメントを削除しますか？")) {
            destroy(route("comment.destroy", comment.id), {
                preserveScroll: true, // スクロール位置保持
                preserveState: true, // フォーム状態保持
                onSuccess: () => {
                    onCommentDeleted("コメントを削除しました！");
                },
            });
        }
    };

    return (
        <div className="mb-4 p-4 bg-gray-50 rounded shadow-sm">
            <div className="flex justify-between items-center mb-2">
                {/* 投稿者名 */}
                <p className="font-semibold">{comment.user.name}</p>
            </div>
            {/* コメント内容 */}
            <p className="mb-2">{comment.content}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
                {/* コメント投稿日時 */}
                <p>{new Date(comment.created_at).toLocaleString()}</p>
                {/* 現在ログインしているユーザーがコメント投稿者の時に削除ボタンを表示 */}
                {currentUserId === comment.user_id && (
                    <ActionLink
                        onClick={handleDelete}
                        className="text-red-500 hover:text-black focus:outline-none p-1 bg-transparent hover:bg-transparent"
                        title="削除"
                    >
                        <TrashIcon />
                    </ActionLink>
                )}
            </div>
        </div>
    );
};

export default CommentItem;