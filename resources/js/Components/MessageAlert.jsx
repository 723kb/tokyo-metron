import React from 'react'

/**
 * メッセージアラートを表示するコンポーネント
 *
 * @param {Object} props
 * @param {string} props.message - 表示するメッセージ
 * @param {string} props.type - メッセージの種類 ('success', 'error', 'info', 'warning')
 * @returns {JSX.Element} メッセージアラート
 */
const MessageAlert = ({ message, type }) => {
  
  /**
   * メッセージタイプに基づいてスタイルクラスを返す関数
   *
   * @returns {string} Tailwind CSSクラス名
   */
  const getAlertStyle = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-400 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-400 text-red-700';
      case 'info':
        return 'bg-blue-100 border-blue-400 text-blue-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-400 text-yellow-700';
      default:
        return 'bg-gray-100 border-gray-400 text-gray-700';
    }
  };

  return (
    <div
      className={`border px-4 py-3 rounded relative mb-4 ${getAlertStyle()}`}
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default MessageAlert