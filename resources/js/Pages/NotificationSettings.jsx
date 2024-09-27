import React, { useEffect } from "react";
import { Head } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import LineNotificationSetting from "@/Components/LineNotificationSetting";
import { useNotificationSettings } from "@/hooks/useNotificationSettings"; // ロジックが長くなったのでカスタムフックに切り出し
import ActionLink from "@/Components/ActionLink";
import MessageAlert from "@/Components/MessageAlert";

/**
 * 通知設定ページのコンポーネント
 * ユーザーのお気に入り路線の通知設定を管理する
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Array} props.userLineSettings - ユーザーの路線設定の初期データ
 * @param {string|null} props.flashMessage - フラッシュメッセージ（存在する場合）
 * @returns {JSX.Element} 通知設定ページの要素
 */
const NotificationSettings = ({
    userLineSettings = [],
    flashMessage = null,
}) => {
    // カスタムフックを使用して通知設定の状態と操作関数を取得
    const {
        data,
        processing,
        errors,
        message: hookMessage,
        setMessage,
        isChanged, // 変更を追跡するフラグ
        handleChange,
        handleToggle,
        handleSubmit,
    } = useNotificationSettings(userLineSettings);

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
    }, [flashMessage]);

    return (
        <Authenticated>
            <Head title="通知設定" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold mb-4">通知設定</h1>

                    {/* メッセージアラートの表示 */}
                    {hookMessage && (
                        <MessageAlert
                            message={hookMessage.text}
                            type={hookMessage.type}
                        />
                    )}

                    {/* フォームの状態に変更があった場合の警告メッセージ */}
                    {isChanged && (
                        <MessageAlert
                            message="保存が完了していない設定があります。「設定を保存」ボタンを押してください。"
                            type="warning"
                        />
                    )}

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
                                    (setting) => setting.favorite_flag === 1,
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
                                onClick={(e) => handleSubmit(e)}
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
        </Authenticated>
    );
};

export default NotificationSettings;
