import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useNotificationSettings } from "@/hooks/useNotificationSettings";
import MessageAlert from "@/Components/MessageAlert";
import LineNotifyConnection from "@/Components/LineNotifyConnection";
import NotificationSettingsForm from "@/Components/NotificationSettingsForm";
import { useFlashMessage } from "@/hooks/useFlashMessage";
import { useLineNotifyConnection } from "@/hooks/useLineNotifyConnection";
import NotificationTypeExplanation from "@/Components/NotificationTypeExplanation";

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
    // LINE Notify連携状態を管理するローカルステート
    const [localIsLineConnected, setLocalIsLineConnected] =
        useState(isLineConnected);

    // propsのisLineConnectedが変更された場合、ローカルステートを更新
    useEffect(() => {
        setLocalIsLineConnected(isLineConnected);
    }, [isLineConnected]);

    // カスタムフックを使用して通知設定の状態と操作関数を取得
    const {
        data,
        message: hookMessage,
        setMessage,
        isChanged, // 変更を追跡するフラグ
        isSubmitting,
    } = useNotificationSettings(userLineSettings);

    // フラッシュメッセージ処理用カスタムフック
    useFlashMessage(flashMessage, setMessage);

    // LINE Notify接続/切断用カスタムフック
    const { handleDisconnect: originalHandleDisconnect } =
        useLineNotifyConnection();

    // お気に入り路線の有無を確認
    const hasFavoriteLines = data.userLineSettings.some(
        (setting) => setting.favorite_flag === 1,
    );

    /**
     * LINE Notify連携解除ハンドラ
     * 連携解除が成功した場合、LINE Notify連携状態を更新する
     */
    const handleDisconnect = async () => {
        const result = await originalHandleDisconnect();
        if (result.success) {
            setLocalIsLineConnected(false);
        }
    };

    return (
        <Authenticated backUrl="/mypage">
            <Head title="通知設定" />
            
            <div className="py-12">
                <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <h1 className="text-2xl font-bold mb-4">通知設定</h1>

                        {/* フックからのメッセージがある場合、アラートを表示 */}
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

                        {/* 通知タイプの説明 */}
                        <NotificationTypeExplanation />

                        {/* LINE Notify連携コンポーネント */}
                        <LineNotifyConnection
                            isConnected={localIsLineConnected}
                            connectUrl={lineConnectUrl}
                            onDisconnect={handleDisconnect}
                        />

                        {!hasFavoriteLines ? (
                            // お気に入り路線がない場合、メッセージを表示
                            <div className="mb-4 p-4 border rounded">
                                <p className="text-lg">
                                    通知設定をするには路線のお気に入り登録が必要です。
                                </p>
                            </div>
                        ) : (
                            // お気に入り路線がある場合、設定フォームを表示
                            <NotificationSettingsForm
                                initialSettings={userLineSettings.filter(
                                    (setting) => setting.favorite_flag === 1,
                                )}
                                onSettingsSaved={() =>
                                    setLocalIsLineConnected(true)
                                }
                            />
                        )}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default NotificationSettings;
