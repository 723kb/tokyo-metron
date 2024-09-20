import React from "react";

// ステータス変換関数

/**
 * APIから受け取った運行状況を内部で使用する状態に変換する
 *
 * @param {string} apiStatus - APIから受け取った運行状況
 * @returns {("normal" | "warning" | "info" | "other")} 変換後の内部状態
 */
const convertStatus = (apiStatus) => {
    switch (apiStatus) {
        case "平常運転":
            return "normal";
        case "ダイヤ乱れ":
        case "一部列車遅延":
        case "運転見合わせ":
        case "直通運転中止":
            return "warning";
        case "運転再開":
        case "直通運転再開":
        case "運転再開見込":
            return "info";
        default:
            return "other";
    }
};

// ステータスカラーマップ
const statusColorMap = {
    normal: "green",
    warning: "red",
    info: "blue",
    other: "gray",
};

/**
 * 運行状況を表示するコンポーネント
 *
 * @param {Object} props
 * @param {string} props.status - 運行状況
 * @returns {JSX.Element} 運行状況を表示する要素
 */
const StatusDisplay = ({ status }) => {
    const convertedStatus = convertStatus(status);
    // 運行状況の色を決定
    const statusColor = statusColorMap[convertedStatus];

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
