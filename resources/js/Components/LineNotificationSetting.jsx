import React from "react";
import ToggleButton from "./ToggleButton";
import DayCheackboxes from "./DayCheackboxes";
import TimeSettings from "./TimeSettings";

/**
 * 路線ごとの通知設定を表示・管理するコンポーネント
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Object} props.setting - 現在の通知設定
 * @param {number} props.index - 設定の配列内のインデックス
 * @param {Function} props.handleChange - 設定変更を処理する関数
 * @param {Function} props.handleToggle - 通知のオン/オフを切り替える関数
 * @returns {JSX.Element} 路線ごとの通知設定
 */
const LineNotificationSetting = ({
    setting,
    index,
    handleChange,
    handleToggle,
}) => {
    return (
        <div key={setting.id} className="mb-4 p-4 border rounded">
            {/* 路線名を表示 */}
            <h2 className="text-xl font-semibold mb-2">{setting.line.name}</h2>

            {/* 通知のオン/オフを切り替えるトグルボタン */}
            <ToggleButton
                isOn={setting.notify_status_flag}
                onToggle={() => handleToggle(index)}
                label="通知を有効にする"
            />

            {/* 通知が有効な場合のみ、曜日と時間の設定を表示 */}
            {setting.notify_status_flag && (
                <>
                    {/* 曜日の設定 */}
                    <DayCheackboxes
                        setting={setting}
                        index={index}
                        handleChange={handleChange}
                    />
                    {/* 時間の設定 */}
                    <TimeSettings
                        setting={setting}
                        index={index}
                        handleChange={handleChange}
                    />
                </>
            )}
        </div>
    );
};

export default LineNotificationSetting;
