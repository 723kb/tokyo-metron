import React from "react";
import CommentCount from "@/Components/CommentCount";
import { Link } from "@inertiajs/react";
import StatusDisplay from "./StatusDisplay";

/**
 * 路線の運行状況を表示するカードコンポーネント
 *
 * @param {Object} props
 * @param {string} props.id - 路線ID
 * @param {string} props.name - 路線名
 * @param {string} props.lineColor - 路線のカラーコード
 * @param {string} props.status - 運行状況
 * @param {string} props.content - 運行状況の詳細内容
 * @param {number} props.commentCount - コメント数
 * @param {boolean} props.isAuthenticated - ユーザーが認証されているかどうか
 * @returns {JSX.Element} 路線状況カード
 */
const LineStatusCard = ({
    id,
    name,
    lineColor,
    status,
    content,
    commentCount,
    isAuthenticated,
}) => {
    // カードの内容を定義
    const cardContent = (
        <div className="px-4 py-5 sm:p-6">
            {/* 路線名 */}
            <h3 className="text-lg leading-6 font-semibold text-white mb-2">
                {name}
            </h3>
            {/* 運行状況 */}
            <StatusDisplay status={status} />
            {/* 運行状況の詳細 */}
            <p className="mt-2 text-sm text-white [text-shadow:_1px_1px_2px_rgba(0,0,0,0.5)]">
                {content}
            </p>
            {/* コメント数 */}
            <CommentCount count={commentCount} />
        </div>
    );

    // カードの背景色スタイル
    const cardStyle = {
        backgroundColor: lineColor,
    };

    // カードのクラス（認証状態に応じてホバー効果を追加）
    const cardClasses = `shadow-md rounded-lg overflow-hidden ${
        isAuthenticated
            ? "transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer"
            : ""
    }`;

    // 認証状態に応じて表示の出しわけ
    return isAuthenticated && id ? (
        <Link
            href={route("line.index", { id: id })}
            className={cardClasses}
            style={cardStyle}
        >
            {cardContent}
        </Link>
    ) : (
        <div className={cardClasses} style={cardStyle}>
            {cardContent}
        </div>
    );
};

export default LineStatusCard;