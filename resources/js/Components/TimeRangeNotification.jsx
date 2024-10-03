import React, { useState } from "react";
import ExampleBox from "./ExampleBox";

/**
必須通知の説明を表示するコンポーネント
 * 
 * ユーザーが展開/折りたたみ可能な形式で必須通知を説明。
 *
 * @returns {JSX.Element} 必須通知の説明コンポーネント
 */
const TimeRangeNotification = () => {
    /**
     * 説明の表示状態を管理するstate
     * @type {[boolean, function]} useState hook
     */
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full text-left text-lg font-medium text-blue-600 focus:outline-none"
            >
                <span>A. 時間帯通知</span>
                <span className="toggle-icon text-2xl sm:text-base">
                    {isOpen ? "▲" : "▼"}
                </span>
            </button>
            {isOpen && (
                <div className="mt-2 pl-4">
                    <p className="mb-2">
                        指定された時間内に遅延や運休が発生した際、運行状況が変化するたびに通知を受け取ります。遅延などがない限り通知はされません
                    </p>
                    <ExampleBox
                        title="例：千代田線 月-金 6:00 - 19:00で設定"
                        items={[
                            "月 7時に遅延発生 → 遅延の通知",
                            "月 8時に遅延解消 → 平常運転と通知",
                            "運行状況をリアルタイムで知りたい、予定の変更に迅速に対応したい人におすすめ。",
                        ]}
                    />
                </div>
            )}
        </div>
    );
};

export default TimeRangeNotification;
