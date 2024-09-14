import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import StatusDisplay from "@/Components/StatusDisplay";
import LineHeroSection from "@/Components/LineHeroSection";
import ActionLink from "@/Components/ActionLink";
import CommentCount from "@/Components/CommentCount";
import CommentForm from "@/Components/CommentForm";
import CommentItem from "@/Components/CommentItem";
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
 *  @param {string} props.message - コメントアクション後に表示するメッセージ
 * @param {Object} props.auth - 認証情報
 * @returns {JSX.Element} 路線投稿詳細ページ
 */
const LinePostDetail = ({ line, statusUpdate, comments, message, auth }) => {
    const [showCommentForm, setShowCommentForm] = useState(false); // 最初はコメント入力欄非表示
    const [localMessage, setLocalMessage] = useState(message); // 現在のメッセージの状態
    const [messageType, setMessageType] = useState("success"); // メッセージの種類を追跡するための状態

    /**
     * メッセージを3秒後に消去するEffect
     */
    useEffect(() => {
        if (localMessage) {
            const timer = setTimeout(() => {
                setLocalMessage("");
                setMessageType(""); // メッセージタイプもリセット
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [localMessage]);

    /**
     * コメント追加時のハンドラー
     */
    const handleCommentAdded = () => {
        setShowCommentForm(false); // コメント入力欄は非表示に
        setLocalMessage("コメントしました！");
        setMessageType("success");
    };

    const handleCommentDeleted = () => {
        setLocalMessage("コメントを削除しました！");
        setMessageType("error");
    };

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
            <div className="py-12">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    {/* コメントアクション後に表示するメッセージ */}
                    {localMessage && (
                        <MessageAlert
                            message={localMessage}
                            type={messageType}
                        />
                    )}
                    {/* 運行状況の詳細情報 */}
                    <StatusUpdateDetails
                        statusUpdate={statusUpdate}
                        onCommentClick={() =>
                            setShowCommentForm(!showCommentForm)
                        }
                        commentsCount={comments.length}
                    />
                    {/* showCommentFormがtrueの時にコメント入力欄を表示 */}
                    {showCommentForm && (
                        <CommentForm
                            lineId={line.id}
                            postId={statusUpdate.id}
                            onCommentAdded={handleCommentAdded}
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