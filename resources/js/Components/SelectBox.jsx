import React from 'react';

/**
 * セレクトボックスコンポーネント
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Array} props.options - セレクトボックスの選択肢配列 [{value: string, label: string}]
 * @param {string} props.value - 現在選択されている値
 * @param {Function} props.onChange - 選択変更時のハンドラ関数
 * @param {string} props.label - セレクトボックスのラベル
 * @returns {JSX.Element} セレクトボックス
 */
const SelectBox = ({ options = [], value, onChange, label }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={label}>
        {label}
      </label>
      <select
        id={label}
        value={value}
        onChange={onChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        {/* 渡されたオプション配列からoption要素を生成 */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;