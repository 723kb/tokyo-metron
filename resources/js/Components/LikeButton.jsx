import React, { useState } from "react";

/**
 * いいねボタンコンポーネント
 *
 * いいねボタンといいねの件数を表示
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {number} props.initialLikes - 初期のいいね数
 * @param {Function} props.onLike - いいねが押された時のコールバック関数
 * @returns {JSX.Element} いいねボタン
 */
const LikeButton = ({ initialLikes, onLike }) => {
    /**
     * いいねの数を管理するstate
     *
     * @type {[number, function]} likes - 現在のいいね数, setLikes - いいね数を更新する関数
     */
    const [likes, setLikes] = useState(initialLikes);

    /**
     * ユーザーがいいねしているかどうかを管理するstate
     *
     * @type {[boolean, function]} isLiked - いいね状態, setIsLiked - いいね状態を更新する関数
     */
    const [isLiked, setIsLiked] = useState(false);

    /**
     * いいねボタンがクリックされた時の処理
     */
    const handleLike = () => {
        if (isLiked) {
            // すでにいいねしている場合はマイナス
            setLikes(likes - 1);
        } else {
            // いいねしていない場合はプラス
            setLikes(likes + 1);
        }
        // いいね状態を反転
        setIsLiked(!isLiked);
        // 親コンポーネントに新しいいいね状態を通知
        onLike(!isLiked);
    };

    return (
        <button
            onClick={handleLike}
            className={`flex items-center space-x-1 ${
                isLiked ? "text-blue-600" : "text-gray-600"
            } hover:text-blue-600`}
        >
            {/* いいねアイコン */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                />
            </svg>
            {/* いいね数の表示 */}
            <span>{likes}</span>
        </button>
    );
};

export default LikeButton;