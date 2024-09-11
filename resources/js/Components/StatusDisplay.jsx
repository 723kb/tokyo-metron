import React from "react";

/**
 * 運行状況を表示するコンポーネント
 *
 * @param {Object} props
 * @param {string} props.status - 運行状況
 * @returns {JSX.Element} 運行状況を表示する要素
 */
const StatusDisplay = ({ status }) => {
    // 運行状況に応じた色を定義
    const statusColorMap = {
        平常運転: "green",
        default: "red",
    };

    // 運行状況の色を決定（指定された状況がない場合はデフォルト色を使用）
    const statusColor = statusColorMap[status] || statusColorMap.default;

    return (
        <div className="mb-4">
            <span
                className={`inline-block px-2 py-1 text-xs font-semibold rounded text-white bg-${statusColor}-600`}
            >
                {status}
            </span>
        </div>
    );
};

export default StatusDisplay;