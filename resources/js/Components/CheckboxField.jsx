import React from "react";
import InputError from "@/Components/InputError";

/**
 * チェックボックスフィールドコンポーネント
 * 
 * ラベル付きのチェックボックス入力と、オプションのエラーメッセージを表示。
 * FormField.jsxを分割。
 * 
 * @param {Object} props - コンポーネントのプロパティ
 * @param {string} props.id - チェックボックス入力のID
 * @param {string} props.label - チェックボックスのラベルテキスト
 * @param {boolean} props.checked - チェックボックスがチェックされているかどうか
 * @param {Function} props.onChange - チェックボックスの状態が変更されたときに呼び出される関数
 * @param {string} [props.error] - 表示するエラーメッセージ（存在する場合）
 * @param {Object} [props.style] - ラベルに適用する追加のインラインスタイル
 * @param {boolean} [props.isFavoritePage=false] - このチェックボックスがお気に入りページで使用されているかどうか（スタイリングに影響）
 * @returns {JSX.Element} レンダリングされたチェックボックスフィールドコンポーネント0.isFavoritePage=false]
 * @returns {*}
 */
const CheckboxField = ({
    id,
    label,
    checked,
    onChange,
    error,
    style,
    isFavoritePage = false,
}) => {
    const labelClass = isFavoritePage
        ? "w-full ml-2 flex items-center rounded transition duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg cursor-pointer"
        : "ml-2 text-gray-700 cursor-pointer";

    const spanClass = isFavoritePage
        ? "text-lg text-white font-semibold py-2 px-4"
        : "";

    return (
        <div className="mt-4">
            <div className="flex items-center">
                <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                    htmlFor={id}
                    className={labelClass}
                    style={style}
                >
                    <span className={spanClass}>{label}</span>
                </label>
            </div>
            {error && <InputError message={error} className="mt-2" />}
        </div>
    );
};

export default CheckboxField;