import { useState, useEffect, useCallback } from "react";
import { Head } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import LineHeroSection from "@/Components/LineHeroSection";
import CommentForm from "@/Components/CommentForm";
import MessageAlert from "@/Components/MessageAlert";
import StatusUpdateDetails from "@/Components/StatusUpdateDetails";
import CommentSection from "@/Components/CommentSection";

/**
 * 路線の特定の運行状況詳細を表示するコンポーネント
 *
 * @param {Object} props
 * @param {Object} props.line - 路線情報
 * @param {Object} props.statusUpdate - 特定の運行状況更新
 * @param {Array} props.comments - 運行状況に対するコメント
 * @param {string} props.initialMessage - 初期メッセージ
 * @param {Object} props.auth - 認証情報
 * @returns {JSX.Element} 路線投稿詳細ページ
 */
const LinePostDetail = ({
    line,
    statusUpdate,
    comments,
    initialMessage,
    auth,
}) => {
    // コメントフォームの表示状態を管理するstate
    const [showCommentForm, setShowCommentForm] = useState(false); // 最初はコメント入力欄非表示

    // メッセージの状態を管理するstate
    const [message, setMessage] = useState({
        text: initialMessage || "",
        type: initialMessage ? "success" : "",
    });

    /**
     * メッセージを3秒後に消去するEffect
     */
    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => {
                setMessage({ text: "", type: "" });
            }, 3000);
            // クリーンアップ関数：コンポーネントのアンマウント時やmessage.textが変更される前にタイマーをクリア
            return () => clearTimeout(timer);
        }
    }, [message.text]);

    /**
     * コメント追加時のハンドラー
     * コメントフォームを非表示にし、成功メッセージを設定
     */
    const handleCommentAdded = useCallback(() => {
        setShowCommentForm(false);
        setMessage({ text: "コメントしました！", type: "success" });
    }, [setShowCommentForm, setMessage]);

    /**
     * コメントフォームのキャンセルハンドラー
     * コメントフォームを非表示にする
     */
    const handleCancelComment = () => {
        setShowCommentForm(false);
    };

    /**
     * コメント削除時のハンドラー
     * 削除成功メッセージを設定
     */
    const handleCommentDeleted = useCallback(() => {
        setMessage({ text: "コメントを削除しました！", type: "info" });
    }, [setMessage]);

    // 必要なデータが存在しない場合のエラー表示
    if (!line || !statusUpdate) return <div>情報が見つかりません。</div>;

    // コメントを日付の降順でソート
    const sortedComments = [...comments].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at), // 作成日時を比較 新しいものが配列の前に来る
    );

    return (
        <Authenticated>
            <Head title={`${line.name} の運行状況詳細`} />

            {/* ヒーローセクション */}
            <LineHeroSection lineName={line.name} lineColor={line.color_code} />
            <div className="py-2 sm:py-12">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    {/* コメントアクション後に表示するメッセージ */}
                    {message.text && (
                        <MessageAlert
                            message={message.text}
                            type={message.type}
                        />
                    )}
                    {/* 運行状況の詳細情報 */}
                    <StatusUpdateDetails
                        statusUpdate={statusUpdate}
                        onCommentClick={() =>
                            setShowCommentForm(!showCommentForm)
                        }
                        commentsCount={comments.length}
                        showCommentForm={showCommentForm}
                    />
                    {/* showCommentFormがtrueの時にコメント入力欄を表示 */}
                    {showCommentForm && (
                        <CommentForm
                            lineId={line.id}
                            postId={statusUpdate.id}
                            onCommentAdded={handleCommentAdded}
                            onCancel={handleCancelComment}
                        />
                    )}
                    {/* コメントセクション */}
                    <CommentSection
                        comments={sortedComments}
                        currentUserId={auth.user.id}
                        onCommentDeleted={handleCommentDeleted}
                    />
                </div>
            </div>
        </Authenticated>
    );
};

export default LinePostDetail;