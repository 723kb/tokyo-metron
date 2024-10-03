import React from "react";
import TimeRangeNotification from "./TimeRangeNotification";
import FixedTimeNotification from "./FixedTimeNotification";

/**
 * 通知タイプの説明を表示する親コンポーネント
 * 
 * 時間帯通知と必須通知の両方の説明を含む。
 *
 * @returns {JSX.Element} 通知タイプ説明の親コンポーネント

 */
const NotificationTypeExplanation = () => {
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">通知タイプ</h3>
            <div className="space-y-4">
                {/* 時間帯通知の説明セクション */}
                <TimeRangeNotification />
                {/* 必須通知の説明セクション */}
                <FixedTimeNotification />
            </div>
        </div>
    );
};

export default NotificationTypeExplanation;
