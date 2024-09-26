import { useForm } from "@inertiajs/react";

/**
 * 通知設定を管理するカスタムフック
 * 
 * ユーザーの通知設定を管理し、フォームの状態、
 * データの更新、サーバーへの送信を処理する。
 * 
 * @param {Array} initialUserLineSettings - 初期の通知設定データ
 * @returns {Object} フォームデータ、処理状態、エラー、ハンドラー関数を含むオブジェクト
 */
export const useNotificationSettings = (initialUserLineSettings) => {
  // useFormフックを使用してフォームの状態を管理
    const { data, setData, patch, processing, errors } = useForm({
        userLineSettings: initialUserLineSettings.map((setting) => ({
            ...setting,
            // 各通知設定をブール値に変換
            notify_status_flag: Boolean(setting.notify_status_flag),
            notify_monday: Boolean(setting.notify_monday),
            notify_tuesday: Boolean(setting.notify_tuesday),
            notify_wednesday: Boolean(setting.notify_wednesday),
            notify_thursday: Boolean(setting.notify_thursday),
            notify_friday: Boolean(setting.notify_friday),
            notify_saturday: Boolean(setting.notify_saturday),
            notify_sunday: Boolean(setting.notify_sunday),
        })),
    });

    /**
     * 個別の設定項目を変更するハンドラー
     * 
     * @param {number} index - 変更する設定の配列内のインデックス
     * @param {string} field - 変更するフィールド名
     * @param {any} value - 新しい値
     */
    const handleChange = (index, field, value) => {
        const updatedSettings = [...data.userLineSettings];
        updatedSettings[index][field] = value;
        setData("userLineSettings", updatedSettings);
    };

    /**
     * 通知のオン/オフを切り替えるハンドラー
     * 
     * @param {number} index - 切り替える設定の配列内のインデックス
     */
    const handleToggle = (index) => {
        const updatedSettings = [...data.userLineSettings];
        updatedSettings[index].notify_status_flag = !updatedSettings[index].notify_status_flag;
        setData("userLineSettings", updatedSettings);
    };

    /**
     * フォーム送信を処理するハンドラー
     * 
     * バリデーションを行い、有効な場合はサーバーに更新リクエストを送信する。
     * 
     * @param {Event} e - フォーム送信イベント
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        // 通知が有効な場合、少なくとも1つの曜日が選択されているか確認
        const isValid = data.userLineSettings.every(
            (setting) =>
                setting.notify_status_flag === false ||
                setting.notify_monday ||
                setting.notify_tuesday ||
                setting.notify_wednesday ||
                setting.notify_thursday ||
                setting.notify_friday ||
                setting.notify_saturday ||
                setting.notify_sunday,
        );

        if (!isValid) {
            alert("通知を有効にする場合は、少なくとも1つの曜日を選択してください。");
            return;
        }

        // patchメソッドを使用してサーバーに更新リクエストを送信
        patch(route("notification-settings.update"), data, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                alert("設定が正常に更新されました。");
            },
            onError: (errors) => {
                console.error("Error updating settings:", errors);
                alert("設定の更新中にエラーが発生しました。");
            },
        });
    };

    return {
      data,           // フォームデータ
      processing,     // 送信処理中かどうかのフラグ
      errors,         // バリデーションエラー
      handleChange,   // 個別設定変更ハンドラー
      handleToggle,   // 通知オン/オフ切り替えハンドラー
      handleSubmit,   // フォーム送信ハンドラー
  };
};
