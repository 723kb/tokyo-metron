import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import MessageAlert from "@/Components/MessageAlert";
import ActionButton from "@/Components/ActionButton";
import FavoritesListComponent from "@/Components/FavoritesListComponent";

/**
 * お気に入り路線一覧コンポーネント
 *
 * @param {Object} props
 * @param {Array} props.favorites - お気に入り路線のリスト
 * @param {string} props.initialMessage - 初期メッセージ
 */
const FavoriteList = ({ favorites, initialMessage }) => {
    // フラッシュメッセージの状態を管理
    const [flashMessage, setFlashMessage] = useState(initialMessage || "");
    const [flashMessageType, setFlashMessageType] = useState("success");

    /**
     * メッセージを3秒後に消去するEffect
     */
    useEffect(() => {
        if (flashMessage) {
            const timer = setTimeout(() => {
                setFlashMessage("");
                setFlashMessageType("");
            }, 3000);
            // クリーンアップ関数：コンポーネントのアンマウント時やflashMessageが変更される前にタイマーをクリア
            return () => clearTimeout(timer);
        }
    }, [flashMessage]);

    /**
     * 初期メッセージの設定を管理するeffect
     */
    useEffect(() => {
        if (initialMessage) {
            setFlashMessage(initialMessage);
            // initialMessageの内容に応じてメッセージタイプを設定
            setFlashMessageType(determineMessageType(initialMessage));
        }
    }, [initialMessage]); // initialMessageが変わるたびに実行

    /**
     * メッセージの内容に基づいてメッセージタイプを決定する関数
     * @param {string} message - メッセージ内容
     * @returns {string} メッセージタイプ
     */
    const determineMessageType = (message) => {
        if (message.toLowerCase().includes("削除")) return "info";
        if (
            message.toLowerCase().includes("エラー") ||
            message.toLowerCase().includes("失敗")
        )
            return "error";
        return "success";
    };

    /**
     * お気に入り削除成功時のハンドラー
     */
    const handleDeleteSuccess = () => {
        setFlashMessage("お気に入りを削除しました！");
        setFlashMessageType("info");
    };

    /**
     * お気に入り削除失敗時のハンドラー
     */
    const handleDeleteError = () => {
        setFlashMessage("削除に失敗しました");
        setFlashMessageType("error");
    };

    return (
        <Authenticated backUrl="/mypage">
            <Head title="お気に入り一覧" />
            
            <div className="py-2 sm:py-12">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 mb-4 bg-white border-b border-gray-200">
                        {/* お気に入り機能実行後に表示するメッセージ */}
                        {flashMessage && (
                            <MessageAlert
                                message={flashMessage}
                                type={flashMessageType}
                            />
                        )}
                        <h1 className="text-2xl font-bold">
                            お気に入り一覧
                        </h1>
                    </div>
                    {/* お気に入り登録している路線があれば一覧で表示 */}
                    <FavoritesListComponent
                        favorites={favorites}
                        onDeleteSuccess={handleDeleteSuccess}
                        onDeleteError={handleDeleteError}
                    />
                    <div className="flex justify-center p-6 bg-white border-b border-gray-200">
                        {/* お気に入り登録の有無に応じて登録ボタンと編集ボタンを表示 */}
                        <ActionButton favorites={favorites} />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default FavoriteList;
