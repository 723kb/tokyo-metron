import React from "react";
import FormField from "@/Components/FormField";

/**
 * 通知の時間設定を管理するコンポーネント
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Object} props.setting - 現在の通知設定
 * @param {number} props.index - 設定の配列内のインデックス
 * @param {Function} props.handleChange - 設定変更を処理する関数
 * @returns {JSX.Element} 時間設定フォーム
 */
const TimeSettings = ({ setting, index, handleChange }) => {
    return (
        <div className="mt-4">
            <h3 className="font-semibold mb-2">時間設定</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 通知開始時間の入力フィールド */}
                <FormField
                    type="time"
                    label="開始時間"
                    value={setting.notify_start_time}
                    onChange={(e) =>
                        handleChange(index, "notify_start_time", e.target.value)
                    }
                    className="w-full"
                />
                {/* 通知終了時間の入力フィールド */}
                <FormField
                    type="time"
                    label="終了時間"
                    value={setting.notify_end_time}
                    onChange={(e) =>
                        handleChange(index, "notify_end_time", e.target.value)
                    }
                    className="w-full"
                />
            </div>
            <div>
                {/* 必須通知時刻の入力フィールド */}
                <FormField
                    type="time"
                    label="必須通知時刻"
                    value={setting.notify_fixed_time}
                    onChange={(e) =>
                        handleChange(index, "notify_fixed_time", e.target.value)
                    }
                    className="w-full"
                />
            </div>
        </div>
    );
};

export default TimeSettings;
