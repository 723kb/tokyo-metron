import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import MessageAlert from "@/Components/MessageAlert";
import TrashIcon from "@/Components/TrashIcon";
import ActionLink from "@/Components/ActionLink";

/**
 * お気に入り路線一覧コンポーネント
 *
 * @param {Object} props
 * @param {Array} props.favorites - お気に入り路線のリスト
 * @param {string} props.initialMessage - 初期メッセージ
 */
const FavoriteList = ({ favorites, initialMessage }) => {
    // メッセージの状態を管理
    const [message, setMessage] = useState(initialMessage ? "success" : "");
    const [messageType, setMessageType] = useState("success");

    // useFormフックを使用して削除機能を管理
    const { delete: destroy } = useForm();

    /**
     * メッセージを3秒後に消去するEffect
     */
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
                setMessageType("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    /**
     * 初期メッセージの設定を管理するeffect
     */
    useEffect(() => {
        if (initialMessage) {
            setMessage(initialMessage);
            // initialMessageの内容に応じてメッセージタイプを設定
            setMessageType(
                initialMessage.includes("削除") ? "info" : "success",
            );
        }
    }, [initialMessage]); // initialMessageが変わるたびに実行

    /**
     * お気に入り削除処理
     * @param {number} id - 削除するお気に入りのID
     */
    const handleDelete = (id) => {
        if (confirm("このお気に入りを削除してもよろしいですか？")) {
            destroy(route("favorites.destroy", id), {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setMessage("お気に入りを削除しました！");
                    setMessageType("info");
                },
                onError: () => {
                    setMessage("削除に失敗しました");
                    setMessageType("error");
                },
            });
        }
    };

    return (
        <Authenticated>
            <Head title="お気に入り一覧" />

            <div className="py-12">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        {/* お気に入り機能実行後に表示するメッセージ */}
                        {message && (
                            <MessageAlert
                                message={message}
                                type={messageType}
                            />
                        )}
                        <h1 className="text-2xl font-bold mb-4">
                            お気に入り一覧
                        </h1>
                    </div>

                    {/* お気に入り登録している路線があれば一覧で表示 */}
                    {favorites.length > 0 ? (
                        <div className="flex flex-col">
                            {favorites.map((favorite) => (
                                <div key={favorite.id} className="relative p-6">
                                    <div
                                        className="flex items-center justify-between text-lg font-semibold py-2 px-4 rounded"
                                        style={{
                                            backgroundColor:
                                                favorite.line.color_code,
                                            color: "white",
                                        }}
                                    >
                                        {favorite.line.name}
                                        <button
                                            onClick={() =>
                                                handleDelete(favorite.id)
                                            }
                                            className="bg-white text-black hover:text-red-600 font-bold py-1 px-2 rounded text-sm"
                                        >
                                            <TrashIcon />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="p-6">お気に入りの路線はありません。</p>
                    )}

                    <div className="flex justify-center p-6 bg-white border-b border-gray-200">
                        {/* お気に入り登録の有無に応じて登録ボタンと編集ボタンを表示 */}
                        {favorites.length === 0 ? (
                            <ActionLink
                                href={route("favorites.create")}
                                className="bg-blue-600 hover:bg-blue-400 text-white font-semibold"
                            >
                                登録
                            </ActionLink>
                        ) : (
                            <ActionLink
                                href={route("favorites.edit")}
                                className="bg-green-600 hover:bg-green-400 text-white font-semibold"
                            >
                                更新
                            </ActionLink>
                        )}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default FavoriteList;
