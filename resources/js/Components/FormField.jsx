import React from 'react';
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

/**
 * フォームフィールドコンポーネント
 * 
 * InputLabel, TextInput, InputErrorがセットになったもの
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {string} props.id - 入力フィールドのID
 * @param {string} props.label - フィールドのラベル
 * @param {string} [props.type="text"] - 入力フィールドのタイプ（デフォルトは "text"）
 * @param {string} props.value - 入力フィールドの値
 * @param {Function} props.onChange - 値が変更されたときの関数
 * @param {string} props.error - エラーメッセージ（存在する場合）
 * @returns {JSX.Element} フォームフィールド
 */
const FormField = ({ id, label, type = "text", value, onChange, error }) => {
    return (
        <div className="mt-4">
            <InputLabel htmlFor={id} value={label} />

            <TextInput
                id={id}
                type={type}
                name={id}
                value={value}
                className="mt-1 block w-full"
                autoComplete={type === "password" ? "new-password" : "username"}
                onChange={onChange}
                required
            />

            <InputError message={error} className="mt-2" />
        </div>
    );
};

export default FormField;