import React, { useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import LineNotificationSetting from "@/Components/LineNotificationSetting";
import { useNotificationSettings } from "@/hooks/useNotificationSettings";
import ActionLink from "@/Components/ActionLink";
import MessageAlert from "@/Components/MessageAlert";

/**
 * 通知設定ページのコンポーネント
 * ユーザーのお気に入り路線の通知設定を管理する
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Array} props.userLineSettings - ユーザーの路線設定の初期データ
 * @param {boolean} props.isLineConnected - LINE Notifyとの連携状態
 * @param {string|null} props.lineConnectUrl - LINE Notify連携用のURL
 * @param {string|null} props.flashMessage - フラッシュメッセージ（存在する場合）
 * @returns {JSX.Element} 通知設定ページの要素
 */
const NotificationSettings = ({
    userLineSettings = [],
    flashMessage = null,
    isLineConnected = false,
    lineConnectUrl = null,
}) => {
    // カスタムフックを使用して通知設定の状態と操作関数を取得
    const {
        data,
        processing,
        errors,
        message: hookMessage,
        setMessage,
        isChanged, // 変更を追跡するフラグ
        isSubmitting,
        handleChange,
        handleToggle,
        handleSubmit,
    } = useNotificationSettings(userLineSettings);

    const { post } = useForm();

    // フラッシュメッセージの処理と3秒後の消去
    useEffect(() => {
        if (flashMessage) {
            setMessage({ text: flashMessage, type: "success" });
            const timer = setTimeout(() => {
                setMessage(null);
            }, 3000);

            // コンポーネントのアンマウント時にタイマーをクリア
            return () => clearTimeout(timer);
        }
    }, [flashMessage, setMessage]);

    // LINE Notify連携ボタンのクリックハンドラ
    const handleLineNotifyConnect = () => {
        window.open(lineConnectUrl, "_blank", "noopener,noreferrer"); // 新しいページで開かないとCORSエラーになる
    };

    // LINE Notify連携解除のハンドラ
    const handleDisconnectLineNotify = () => {
        if (confirm("LINE Notifyとの連携を解除しますか？")) {
            post(
                route("line-notify.disconnect"),
                {},
                {
                    preserveState: false, // 状態を保持しない
                    preserveScroll: false, // スクロール位置を保持しない
                    onSuccess: () => {
                        alert("LINE Notifyとの連携を解除しました。");
                    },
                    onError: (errors) => {
                        console.error(
                            "Error disconnecting LINE Notify:",
                            errors,
                        );
                        alert(
                            "LINE Notifyとの連携解除中にエラーが発生しました。",
                        );
                    },
                },
            );
        }
    };

    return (
        <Authenticated>
            <Head title="通知設定" />

            <div className="py-12">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <h1 className="text-2xl font-bold mb-4">通知設定</h1>

                        {/* メッセージアラートの表示 */}
                        {hookMessage && (
                            <MessageAlert
                                message={hookMessage.text}
                                type={hookMessage.type}
                            />
                        )}

                        {/* フォームの状態に変更があった場合の警告メッセージ */}
                        {isChanged && !isSubmitting && (
                            <MessageAlert
                                message="保存が完了していない設定があります。「設定を保存」ボタンを押してください。"
                                type="warning"
                            />
                        )}

                        {/* LINE Notify 連携状況 */}
                        <div className="mb-4 p-4 border-b rounded">
                            <h2 className="text-xl font-semibold mb-2">
                                LINE Notify 連携
                            </h2>
                            {isLineConnected ? (
                                // LINE Notifyと連携済みの場合
                                <>
                                    <p className="text-green-600 mb-2">
                                        LINE Notifyと連携済みです
                                    </p>
                                    <button
                                        onClick={handleDisconnectLineNotify}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        LINE Notify連携を解除
                                    </button>
                                </>
                            ) : (
                                // LINE Notifyと未連携の場合
                                <>
                                    <p className="mb-2">
                                        通知を受け取るにはLINE
                                        Notifyとの連携が必要です
                                    </p>
                                    <button
                                        onClick={handleLineNotifyConnect}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        LINE Notifyと連携する
                                    </button>
                                </>
                            )}
                        </div>

                        {/* お気に入り路線の有無に基づいて表示を切り替え */}
                        {data.userLineSettings.some(
                            (setting) => setting.favorite_flag === 1,
                        ) ? (
                            // お気に入り路線がある場合、設定フォームを表示
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }}
                            >
                                {data.userLineSettings
                                    .filter(
                                        (setting) =>
                                            setting.favorite_flag === 1,
                                    )
                                    .map((setting, index) => (
                                        <LineNotificationSetting
                                            key={setting.id}
                                            setting={setting}
                                            index={index}
                                            handleChange={handleChange}
                                            handleToggle={handleToggle}
                                        />
                                    ))}
                                {/* 設定保存ボタン */}
                                <ActionLink
                                    onClick={handleSubmit}
                                    disabled={processing}
                                >
                                    設定を保存
                                </ActionLink>
                            </form>
                        ) : (
                            // お気に入り路線がない場合、メッセージを表示
                            <div className="mb-4 p-4 border rounded">
                                <p className="text-lg">
                                    通知設定をするには路線のお気に入り登録が必要です
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default NotificationSettings;
