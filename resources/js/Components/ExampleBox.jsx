import React from "react";

/**
 * 例示ボックスを表示するコンポーネント
 * タイトルと項目のリストを受け取り、スタイリングされたボックス内に表示
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {string} props.title - 例示ボックスのタイトル
 * @param {string[]} props.items - 表示する項目の配列
 * @returns {JSX.Element} 例示ボックスコンポーネント
 */
const ExampleBox = ({ title, items }) => (
    <div className="bg-white p-4 rounded border border-gray-200">
        <p className="font-semibold mb-2">{title}</p>
        <ul className="list-disc list-inside space-y-1 text-sm">
            {items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    </div>
);

export default ExampleBox;
