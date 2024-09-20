import React, { useEffect, useState } from "react";
import axios from "axios";

/**
 * いいねボタンコンポーネント
 *
 * いいねボタンといいねの件数を表示
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {number} [props.initialLikes=0] - 初期のいいね数 こうしないとNaNになる
 * @param {boolean} [props.initialIsLiked=false] - 初期のいいね状態（ユーザーがすでにいいねしているかどうか）
 * @returns {JSX.Element} いいねボタン
 */
const LikeButton = ({
    commentId,
    initialLikes = 0,
    initialIsLiked = false,
}) => {
    /**
     * いいねの数を管理するstate
     *
     * @type {[number, function]} likes - 現在のいいね数, setLikes - いいね数を更新する関数
     */
    const [likes, setLikes] = useState(Number(initialLikes) || 0);

    /**
     * ユーザーがいいねしているかどうかを管理するstate
     *
     * @type {[boolean, function]} isLiked - いいね状態, setIsLiked - いいね状態を更新する関数
     */
    const [isLiked, setIsLiked] = useState(initialIsLiked);

    // コンポーネントのマウント時といいね状態の変更時にいいねの状態を取得する
    useEffect(() => {
        // likes テーブルの最新状態を取得
        const fetchLikeStatus = async () => {
            try {
                const response = await axios.get(
                    `/comments/${commentId}/like-status`,
                );
                // 取得した情報でいいねの状態を更新
                setIsLiked(response.data.is_liked);
                setLikes(response.data.likes_count);
            } catch (error) {
                console.error(
                    "いいねの状態取得中にエラーが発生しました",
                    error,
                );
            }
        };

        fetchLikeStatus();
    }, [commentId, isLiked]); // commentIdかisLikedの値が変更した時にuseEffectを実行

    /**
     * いいねボタンがクリックされた時の処理
     * いいねの状態を切り替え、サーバーに更新を送信
     */
    const handleLike = async () => {
        // 即座にUI上でいいね状態を反映(楽観的UI更新)
        setIsLiked((prevIsLiked) => !prevIsLiked); // いいねを反転
        setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1)); // いいねを増減

        try {
            // サーバーにいいねの状態を送信
            const response = await axios[isLiked ? "delete" : "post"](
                `/comments/${commentId}/like`,
            );
            // サーバーからの応答で状態を更新
            setIsLiked(response.data.is_liked);
            setLikes(response.data.likes_count);
        } catch (error) {
            // エラー時にUI状態を元に戻す
            setIsLiked((prevIsLiked) => !prevIsLiked);
            setLikes((prevLikes) => (isLiked ? prevLikes + 1 : prevLikes - 1));

            if (error.response && error.response.status === 409) {
                console.log("すでにいいね済みです");
            } else {
                console.error("いいねの処理中にエラーが発生しました", error);
            }
        }
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
                className="h-6 w-6"
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
