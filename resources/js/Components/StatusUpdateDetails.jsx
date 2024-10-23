import React from "react";
import ActionLink from "./ActionLink";
import CommentCount from "./CommentCount";
import StatusDisplay from "./StatusDisplay";

/**
 * 運行状況の詳細を表示するコンポーネント
 *
 * @param {Object} props
 * @param {Object} props.statusUpdate - 運行状況の詳細情報
 * @param {Function} props.onCommentClick - コメントボタンクリック時のハンドラ関数
 * @param {number} props.commentsCount - コメントの総数
 * @param {boolean} props.showCommentForm - コメントフォームの表示状態
 * @returns {JSX.Element} 運行状況詳細コンポーネント
 */
const StatusUpdateDetails = ({
    statusUpdate,
    onCommentClick,
    commentsCount,
    showCommentForm,
}) => (
    <div className="mb-6">
        <p className="text-sm text-gray-500 mb-2">
            {new Date(statusUpdate.created_at).toLocaleString()}
        </p>
        {/* 運行状況のステータス */}
        <StatusDisplay status={statusUpdate.status} />
        {/* 運行状況の内容 */}
        <p className="mt-2">{statusUpdate.content}</p>
        <div className="flex justify-between items-center mt-4">
            {/* コメント欄が表示されていない時のみボタンを表示 */}
            {!showCommentForm && (
                <ActionLink
                    onClick={onCommentClick}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                >
                    <span className="block w-full">コメントする</span>
                </ActionLink>
            )}
            {/* コメント数 */}
            <CommentCount comments={commentsCount} />
        </div>
    </div>
);

export default StatusUpdateDetails;
