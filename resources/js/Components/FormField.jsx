import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

/**
 * フォームフィールドコンポーネント
 *
 * チェックボックスまたはテキスト入力フィールドを表示し、関連するラベルとエラーメッセージを含む
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {string} props.id - 入力フィールドのID
 * @param {string} props.label - フィールドのラベル
 * @param {string} [props.type="text"] - 入力フィールドのタイプ（デフォルトは "text"）
 * @param {string} props.value - 入力フィールドの値
 * @param {Function} props.onChange - 値が変更されたときの関数
 * @param {string} props.error - エラーメッセージ（存在する場合）
 * @param {string} props.className - 追加のCSSクラス
 * @param {Object} props.style - インラインスタイル（主にチェックボックスのラベルに適用）
 * @param {string} props.placeholder - 入力フィールドのプレースホルダーテキスト
 * @param {boolean} props.isFavoritePage = false, // お気に入りフォームで専用のスタイルを当てるためのプロパティ
 * @returns {JSX.Element} フォームフィールド
 */
const FormField = ({
    id,
    label,
    type = "text",
    value,
    onChange,
    error,
    className,
    style,
    placeholder,
    isFavoritePage = false,
}) => {
    const checkboxLabelClass = isFavoritePage
        ? "w-full ml-2 flex items-center rounded  transition duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg cursor-pointer"
        : "ml-2 text-gray-700 cursor-pointer";

    const checkboxSpanClass = isFavoritePage
        ? "text-lg text-white font-semibold py-2 px-4"
        : "";

    return (
        <div className="mt-4">
            {type === "checkbox" ? (
                // チェックボックスの場合
                <div className="flex items-center">
                    <input
                        id={id}
                        type="checkbox"
                        name={id}
                        checked={value}
                        onChange={onChange}
                        className={`h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded ${className}`}
                    />
                    <label
                        htmlFor={id}
                        className={checkboxLabelClass}
                        style={{ ...style, ...(isFavoritePage ? {} : {}) }}
                    >
                        <span className={checkboxSpanClass}>{label}</span>
                    </label>
                </div>
            ) : (
                // チェックボックス以外の入力フィールドの場合
                <>
                    <InputLabel htmlFor={id} value={label} />
                    <TextInput
                        id={id}
                        type={type}
                        name={id}
                        value={value}
                        className={`mt-1 block w-full ${className}`}
                        autoComplete={
                            type === "password" ? "new-password" : "username"
                        }
                        onChange={onChange}
                        required
                        placeholder={placeholder}
                    />
                </>
            )}

            <InputError message={error} className="mt-2" />
        </div>
    );
};

export default FormField;