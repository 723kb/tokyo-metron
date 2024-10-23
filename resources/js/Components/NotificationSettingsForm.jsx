import React from "react";
import LineNotificationSetting from "@/Components/LineNotificationSetting";
import ActionLink from "@/Components/ActionLink";
import { useNotificationSettings } from "@/hooks/useNotificationSettings";
import MessageAlert from "@/Components/MessageAlert";

/**
 * 通知設定フォームコンポーネント
 * ユーザーの路線ごとの通知設定を表示し、設定の変更を可能にする
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Array} props.settings - ユーザーの通知設定の配列
 * @param {Function} props.onChange - 設定変更時のハンドラ関数
 * @param {Function} props.onToggle - トグル変更時のハンドラ関数
 * @param {Function} props.onSubmit - フォーム送信時のハンドラ関数
 * @param {boolean} props.processing - 処理中フラグ
 * @returns {JSX.Element} 通知設定フォーム
 */
const NotificationSettingsForm = ({ initialSettings, onSettingsSaved }) => {
    const {
        data,
        processing,
        message,
        isChanged,
        isSubmitting,
        handleChange,
        handleToggle,
        handleSubmit,
    } = useNotificationSettings(initialSettings);

    const onSubmit = async (e) => {
        e.preventDefault();
        const result = await handleSubmit(e);
        if (result && result.success) {
            onSettingsSaved();
        }
    };

    return (
        <form onSubmit={onSubmit}>
            {message && (
                <MessageAlert message={message.text} type={message.type} />
            )}
            {isChanged && !isSubmitting && (
                <MessageAlert
                    message="保存が完了していない設定があります。「設定を保存」ボタンを押してください。"
                    type="warning"
                />
            )}
            {/* 各設定項目をマップして表示 */}
            {data.userLineSettings.map((setting, index) => (
                <LineNotificationSetting
                    key={setting.id}
                    setting={setting}
                    index={index}
                    handleChange={handleChange}
                    handleToggle={handleToggle}
                />
            ))}
            <div className="flex justify-center">
                {/* 設定保存ボタン */}
                <ActionLink onClick={onSubmit} disabled={processing}>
                    <span className="block w-full">設定を保存</span>
                </ActionLink>
            </div>
        </form>
    );
};

export default NotificationSettingsForm;
