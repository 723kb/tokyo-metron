import React from "react";
import LineNotificationSetting from "@/Components/LineNotificationSetting";
import ActionLink from "@/Components/ActionLink";

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
const NotificationSettingsForm = ({
    settings,
    onChange,
    onToggle,
    onSubmit,
    processing,
}) => {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault(); // デフォルトのフォーム送信動作を防止
                onSubmit(e); // カスタムの送信ハンドラを呼び出し
            }}
        >
            {/* 各設定項目をマップして表示 */}
            {settings.map((setting, index) => (
                <LineNotificationSetting
                    key={setting.id}
                    setting={setting}
                    index={index}
                    handleChange={onChange}
                    handleToggle={onToggle}
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
