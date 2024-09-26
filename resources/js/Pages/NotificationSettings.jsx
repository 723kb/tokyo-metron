import React from "react";
import { Head } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import LineNotificationSetting from "@/Components/LineNotificationSetting";
import { useNotificationSettings } from "@/hooks/useNotificationSettings"; // ロジックが長くなったのでカスタムフックに切り出し
import ActionLink from "@/Components/ActionLink";

/**
 * 通知設定ページのコンポーネント
 * ユーザーのお気に入り路線の通知設定を管理する
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Array} props.userLineSettings - ユーザーの路線設定の初期データ
 * @returns {JSX.Element} 通知設定ページの要素
 */
const NotificationSettings = ({ userLineSettings = [] }) => {
    // カスタムフックを使用して通知設定の状態と操作関数を取得
    const {
        data,
        processing,
        errors,
        handleChange,
        handleToggle,
        handleSubmit,
    } = useNotificationSettings(userLineSettings);

    return (
        <Authenticated>
            <Head title="通知設定" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold mb-4">通知設定</h1>

                    {/* お気に入り路線があるかどうかを確認 */}
                    {data.userLineSettings.some(
                        (setting) => setting.favorite_flag === 1,
                    ) ? (
                        // お気に入り路線がある場合、設定フォームを表示
                        <form onSubmit={handleSubmit}>
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
                            <ActionLink onClick={handleSubmit}>
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
