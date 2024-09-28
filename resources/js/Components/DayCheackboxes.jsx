import React from "react";
import FormField from "@/Components/FormField";

/**
 * 曜日のチェックボックスを表示するコンポーネント
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Object} props.setting - 現在の通知設定
 * @param {number} props.index - 設定の配列内のインデックス
 * @param {Function} props.handleChange - チェックボックスの変更を処理する関数
 * @returns {JSX.Element} 曜日のチェックボックス
 */
const DayCheackboxes = ({ setting, index, handleChange }) => {
    /**
     * 曜日の設定情報を含む配列
     *
     * @type {Array<{key: string, label: string}>}
     */
    const daysOfWeek = [
        { key: "notify_monday", label: "月" },
        { key: "notify_tuesday", label: "火" },
        { key: "notify_wednesday", label: "水" },
        { key: "notify_thursday", label: "木" },
        { key: "notify_friday", label: "金" },
        { key: "notify_saturday", label: "土" },
        { key: "notify_sunday", label: "日" },
    ];

    return (
        <div className="mt-4">
            <h3 className="font-semibold">曜日設定</h3>
            <div className="flex flex-wrap justify-around">
                {daysOfWeek.map((day) => (
                    <FormField
                        key={day.key}
                        id={`${setting.id}-${day.key}`} // 各チェックボックスに一意のIDを割り当て
                        type="checkbox"
                        label={day.label}
                        value={setting[day.key]} // 各曜日の設定値をチェックボックスに反映
                        onChange={(e) =>
                            handleChange(index, day.key, e.target.checked)
                        } // チェックボックスの状態変更をhandleChange関数に渡す
                        className="mr-1 p-2"
                        labelClassName="ml-1"
                    />
                ))}
            </div>
        </div>
    );
};

export default DayCheackboxes;