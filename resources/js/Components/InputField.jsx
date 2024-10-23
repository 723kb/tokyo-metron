import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

/**
 * 入力フィールドコンポーネント
 * 
 * ラベル、テキスト入力フィールド、エラーメッセージを含む入力フィールドを表示。
 * FormField.jsxを分割。
 * 
 * @param {Object} props - コンポーネントのプロパティ
 * @param {string} props.id - 入力フィールドのID
 * @param {string} props.label - 入力フィールドのラベル
 * @param {string} [props.type="text"] - 入力フィールドのタイプ（デフォルトは "text"）
 * @param {string|number} props.value - 入力フィールドの現在の値
 * @param {Function} props.onChange - 値が変更されたときに呼び出される関数
 * @param {string} [props.error] - 表示するエラーメッセージ（存在する場合）
 * @param {string} [props.className] - 入力フィールドに適用する追加のCSSクラス
 * @param {string} [props.placeholder] - 入力フィールドのプレースホルダーテキスト
 * @returns {JSX.Element} レンダリングされた入力フィールドコンポーネント
 */
const InputField = ({
    id,
    label,
    type = "text",
    value,
    onChange,
    error,
    className,
    placeholder,
}) => {
    return (
        <div className="mt-4">
            <InputLabel htmlFor={id} value={label} />
            <TextInput
                id={id}
                type={type}
                name={id}
                value={value}
                className={`mt-1 block w-full ${className}`}
                autoComplete={type === "password" ? "new-password" : "username"}
                onChange={onChange}
                required
                placeholder={placeholder}
            />
            <InputError message={error} className="mt-2" />
        </div>
    );
};

export default InputField;