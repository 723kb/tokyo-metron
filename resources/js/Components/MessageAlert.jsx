import React from 'react'

/**
 * メッセージアラートを表示するコンポーネント
 *
 * @param {Object} props
 * @param {string} props.message - 表示するメッセージ
 * @param {string} props.type - メッセージの種類 ('success' または 'error')
 * @returns {JSX.Element} メッセージアラート
 */
const MessageAlert = ({ message, type }) => (
  <div
    className={`border px-4 py-3 rounded relative mb-4 ${
      type === "success"
        ? "bg-green-100 border-green-400 text-green-700"
        : "bg-red-100 border-red-400 text-red-700"
    }`}
    role="alert"
  >
    <span className="block sm:inline">{message}</span>
  </div>
);

export default MessageAlert