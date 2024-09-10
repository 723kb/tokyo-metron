import React from "react";

/**
 * エラーメッセージを表示するコンポーネント
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {string} props.message - 表示するエラーメッセージ
 * @returns {JSX.Element|null} エラーメッセージ表示要素、またはメッセージがない場合はnull
 */
const ErrorDisplay = ({ message }) => {
    // メッセージがない場合は何も表示しない
    if (!message) return null;

    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {/* エラーのタイトル */}
            <strong className="font-bold">入力エラー</strong>
            <br />
            {/* エラーメッセージ */}
            <span className="block sm:inline">{message}</span>
        </div>
    );
};

export default ErrorDisplay;