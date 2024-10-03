import React, { useState } from "react";
import ExampleBox from "./ExampleBox";

/**
 * 時間帯通知の説明を表示するコンポーネント
 *
 * ユーザーが展開/折りたたみ可能な形式で時間帯通知を説明。
 *
 * @returns {JSX.Element} 時間帯通知の説明コンポーネント
 */
const FixedTimeNotification = () => {
  
    /**
     * 説明の表示状態を管理するstate
     * @type {[boolean, function]} useState hook
     */
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full text-left text-lg font-medium text-green-600 focus:outline-none"
            >
                <span>B. 必須通知</span>
                <span className="toggle-icon text-2xl sm:text-base">
                    {isOpen ? "▲" : "▼"}
                </span>
            </button>
            {isOpen && (
                <div className="mt-2 pl-4">
                    <p className="mb-2">
                        指定された時間の運行状況を必ず通知で受け取ります。遅延などがなくても必ず通知します。
                    </p>
                    <ExampleBox
                        title="例：千代田線 月-金 14:00で設定"
                        items={[
                            "月-金 14時時点の運行状況を通知",
                            "決まった時間に、その日の運行状況を確実に知りたい人におすすめ。",
                        ]}
                    />
                </div>
            )}
        </div>
    );
};

export default FixedTimeNotification;
