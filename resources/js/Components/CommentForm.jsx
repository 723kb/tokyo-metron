import React from "react";
import { useForm } from "@inertiajs/react";
import ActionLink from "@/Components/ActionLink";

/**
 * コメント投稿フォームコンポーネント
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {number} props.lineId - 路線ID
 * @param {number} props.postId - 投稿ID
 * @param {Function} props.onCommentAdded - コメント追加後のコールバック関数
 * @returns {JSX.Element} コメントフォーム
 */
const CommentForm = ({ lineId, postId, onCommentAdded }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        content: "",
    });

    /**
     * フォーム送信処理
     * 
     * @param {Event} e - フォーム送信イベント
     */
    const submit = (e) => {
        e.preventDefault();
        post(route("comment.store", { lineId, postId }), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                onCommentAdded();
                reset("content");
            },
        });
    };

    return (
        <form onSubmit={submit} className="mt-6">
            <textarea
                value={data.content}
                onChange={(e) => setData("content", e.target.value)}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                rows="4"
                placeholder="コメントを入力してください"
            ></textarea>
            {errors.content && (
                <div className="text-red-500">{errors.content}</div>
            )}
            <div className="mt-4">
                <ActionLink onClick={submit} disabled={processing} className="bg-gray-600 hover:bg-gray-400 text-white font-semibold">
                    投稿
                </ActionLink>
            </div>
        </form>
    );
};

export default CommentForm;