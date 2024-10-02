import React, { useState } from "react";

/**
 * 通知タイプの説明を表示するコンポーネント
 * 
 * 時間帯通知と必須通知の2つのタイプについて、
 * ユーザーが展開/折りたたみ可能な形式で説明を提供します。
 *
 * @returns {JSX.Element} 通知タイプ説明コンポーネント

 */
const NotificationTypeExplanation = () => {
    /**
     * 時間帯通知の説明の表示状態
     * @type {[boolean, function]} useState hook
     */
    const [isTimeRangeOpen, setIsTimeRangeOpen] = useState(false);

    /**
     * 必須通知の説明の表示状態
     * @type {[boolean, function]} useState hook
     */
    const [isFixedTimeOpen, setIsFixedTimeOpen] = useState(false);

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">通知タイプ</h3>
            <div className="space-y-4">
                {/* 時間帯通知の説明セクション */}
                <div>
                    <button
                        onClick={() => setIsTimeRangeOpen(!isTimeRangeOpen)}
                        className="flex justify-between items-center w-full text-left text-lg font-medium text-blue-600 focus:outline-none"
                    >
                        <span>A. 時間帯通知</span>
                        <span className="toggle-icon text-2xl sm:text-base">
                            {isTimeRangeOpen ? "▲" : "▼"}
                        </span>
                    </button>
                    {isTimeRangeOpen && (
                        <div className="mt-2 pl-4">
                            <p className="mb-2">
                                指定された時間内に遅延や運休が発生した際、運行状況が変化するたびに通知を受け取ります。遅延などがない限り通知はされません
                            </p>
                            <div className="bg-white p-4 rounded border border-gray-200">
                                <p className="font-semibold mb-2">
                                    例：千代田線 月-金 6:00 - 19:00で設定
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                    <li>月 7時に遅延発生 → 遅延の通知</li>
                                    <li>月 8時に遅延解消 → 平常運転と通知</li>
                                    <li>
                                        運行状況をリアルタイムで知りたい、予定の変更に迅速に対応したい人におすすめ。
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
                {/* 必須通知の説明セクション */}
                <div>
                    <button
                        onClick={() => setIsFixedTimeOpen(!isFixedTimeOpen)}
                        className="flex justify-between items-center w-full text-left text-lg font-medium text-green-600 focus:outline-none"
                    >
                        <span>B. 必須通知</span>
                        <span className="toggle-icon text-2xl sm:text-base">
                            {isTimeRangeOpen ? "▲" : "▼"}
                        </span>
                    </button>
                    {isFixedTimeOpen && (
                        <div className="mt-2 pl-4">
                            <p className="mb-2">
                                指定された時間の運行状況を必ず通知で受け取ります。遅延などがなくても必ず通知します。
                            </p>
                            <div className="bg-white p-4 rounded border border-gray-200">
                                <p className="font-semibold mb-2">
                                    例：千代田線 月-金 14:00で設定
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                    <li>月-金 14時時点の運行状況を通知</li>
                                    <li>
                                        決まった時間に、その日の運行状況を確実に知りたい人におすすめ。
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationTypeExplanation;
