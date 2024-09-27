import { useForm } from "@inertiajs/react";
import { useState } from "react";

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
    /**
     * メッセージ状態とその更新関数
     */
    const [message, setMessage] = useState(null);

    /**
     * 変更されたかどうかを追跡するフラグとその更新関数
     */
    const [isChanged, setIsChanged] = useState(false);

    /**
     * useFormフックを使用してフォームの状態を管理
     *
     *  @type {Object} フォームの状態と操作関数
     */
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
            notify_start_time: setting.notify_start_time || "", // 警告解消のため、時間関連のフィールドが null の場合に空文字列を使用する
            notify_end_time: setting.notify_end_time || "",
            notify_fixed_time: setting.notify_fixed_time || "",
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
        setIsChanged(true); // 変更があった場合にフラグを立てる
    };

    /**
     * 通知のオン/オフを切り替えるハンドラー
     *
     * @param {number} index - 切り替える設定の配列内のインデックス
     */
    const handleToggle = (index) => {
        const updatedSettings = [...data.userLineSettings];
        updatedSettings[index].notify_status_flag =
            !updatedSettings[index].notify_status_flag;
        setData("userLineSettings", updatedSettings);
        setIsChanged(true); // トグル変更時もフラグを立てる
    };

    /**
     * フォーム送信を処理するハンドラー
     *
     * バリデーションを行い、有効な場合はサーバーに更新リクエストを送信する。
     *
     * @param {Event} e - フォーム送信イベント
     */
    const handleSubmit = (e) => {
        console.log("handleSubmit called");
        e.preventDefault();

        // 通知設定のバリデーションチェック
        const isValid = data.userLineSettings.every((setting) => {
            // 通知が無効の場合は、他のチェックをスキップ
            if (!setting.notify_status_flag) return true;

            // 少なくとも1つの曜日が選択されているかチェック
            const hasSelectedDay =
                setting.notify_monday ||
                setting.notify_tuesday ||
                setting.notify_wednesday ||
                setting.notify_thursday ||
                setting.notify_friday ||
                setting.notify_saturday ||
                setting.notify_sunday;

            // 開始時間と終了時間の両方が設定されているかチェック
            const hasStartAndEndTime =
                setting.notify_start_time && setting.notify_end_time;
            // 必須通知時刻が設定されているかチェック
            const hasFixedTime = setting.notify_fixed_time;

            // 曜日が選択されており、かつ（開始・終了時間の両方 または 必須通知時刻）が設定されているかチェック
            return hasSelectedDay && (hasStartAndEndTime || hasFixedTime);
        });

        // バリデーションエラーの場合、アラートを表示して処理を中断
        if (!isValid) {
            setMessage({
                text: "通知を有効にする場合は必ず曜日を選択し、開始時間と終了時間または必須通知時刻を入力してください。",
                type: "error",
            });
            return;
        }

        // patchメソッドを使用してサーバーに更新リクエストを送信
        patch(route("notification-settings.update"), data, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                setMessage({ text: page.props.message, type: "success" });
                setData("userLineSettings", page.props.userLineSettings);
                setIsChanged(false); // 保存成功後にフラグをリセット
            },
            onError: (errors) => {
                console.error("Error updating settings:", errors);
                setMessage({
                    text: "設定の更新中にエラーが発生しました。",
                    type: "error",
                });
            },
        });
    };

    return {
        data,         // フォームデータ
        processing,   // 送信処理中かどうかのフラグ
        message,      // 現在のメッセージ
        setMessage,   // メッセージを設定する関数
        isChanged,    // 変更を追跡
        errors,       // バリデーションエラー
        handleChange, // 個別設定変更ハンドラー
        handleToggle, // 通知オン/オフ切り替えハンドラー
        handleSubmit, // フォーム送信ハンドラー
    };
};
