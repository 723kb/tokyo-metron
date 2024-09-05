import React from 'react';

/**
 * トグルボタンコンポーネント
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {boolean} props.isOn - トグルの状態（オン/オフ）
 * @param {Function} props.onToggle - トグル状態変更時のコールバック関数
 * @param {string} props.label - トグルボタンのラベル
 * @returns {JSX.Element} トグルボタン
 */
const ToggleButton = ({ isOn, onToggle, label }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <span className="text-gray-700">{label}</span>
      <button
        onClick={onToggle}
        className={`${
          isOn ? 'bg-green-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
      >
        {/* トグルボタンのスライダー */}
        <span
          className={`${
            isOn ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </button>
    </div>
  );
};

export default ToggleButton;