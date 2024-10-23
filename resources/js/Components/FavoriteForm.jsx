import React from "react";
import { useForm } from "@inertiajs/react";
import ActionLink from "@/Components/ActionLink";
import CheckboxField from "./CheckboxField";

/**
 * お気に入り路線のフォームコンポーネント
 *
 * ユーザーがお気に入りの路線を選択・編集するためのフォーム。
 * 新規登録と編集の両方のモードに対応しており、isEditプロパティによって動作が切り替わる。
 *
 * @param {Object} props コンポーネントのプロパティ
 * @param {Array<Object>} props.lines 選択可能な路線のリスト。各オブジェクトは{id, name, color_code}を含む
 * @param {Array<number>} [props.initialSelectedLines=[]] 初期状態で選択されている路線のIDリスト
 * @param {boolean} [props.isEdit=false] 編集モードかどうか。trueの場合、更新用のUIが表示される
 * @returns {JSX.Element} フォームコンポーネント
 */
const FavoriteForm = ({ lines, initialSelectedLines = [], isEdit = false }) => {
    // フォームの送信先とメソッドを決定
    const submitRoute = isEdit ? "favorites.update" : "favorites.store";
    const submitMethod = isEdit ? "put" : "post";
    const submitButtonText = isEdit ? "更新" : "登録";
    const submitButtonClass = isEdit
        ? "font-semibold bg-green-500 text-white hover:bg-green-700 focus:bg-green-500 active:bg-green-700"
        : "font-semibold bg-blue-500 text-white hover:bg-blue-700 focus:bg-blue-500 active:bg-blue-700";

    /**
     * useFormフックを使用してフォームの状態を管理
     * @type {Object} フォームの状態と操作メソッドを含むオブジェクト
     */
    const {
        data,
        setData,
        processing,
        errors,
        [submitMethod]: submit,
    } = useForm({
        selectedLines: initialSelectedLines,
    });

    /**
     * フォーム送信時のハンドラー
     * @param {Event} e - フォーム送信イベント
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        submit(route(submitRoute));
    };

    /**
     * チェックボックスの状態変更時のハンドラー
     * 選択された路線のIDを追加または削除します
     * @param {number} lineId - 変更された路線のID
     */
    const handleCheckboxChange = (lineId) => {
        const isAlreadySelected = data.selectedLines.includes(lineId);
        const updatedLines = isAlreadySelected
            ? data.selectedLines.filter((id) => id !== lineId)
            : [...data.selectedLines, lineId];
        setData("selectedLines", updatedLines);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <p className="block font-medium text-gray-700 mb-2 text-center">
                    路線を選択してください。すでに登録済みのものにはチェックが入っています。
                </p>
                {/* 各路線のチェックボックスを生成 */}
                {lines.map((line) => (
                    <CheckboxField
                        key={line.id}
                        id={`line-${line.id}`}
                        label={line.name}
                        type="checkbox"
                        checked={data.selectedLines.includes(line.id)}
                        value={data.selectedLines.includes(line.id)}
                        onChange={() => handleCheckboxChange(line.id)}
                        style={{ backgroundColor: line.color_code }}
                        isFavoritePage={true}
                    />
                ))}
                {/* バリデーションエラーがある場合に表示 */}
                {errors.selectedLines && (
                    <div className="text-red-500 mt-2 flex justify-center">
                        <span>{errors.selectedLines}</span>
                    </div>
                )}
            </div>
            <div className="flex justify-center">
                {/* 送信ボタン */}
                <ActionLink
                    onClick={handleSubmit}
                    disabled={processing}
                    className={submitButtonClass}
                >
                    <span className="block w-full">{submitButtonText}</span>
                </ActionLink>
            </div>
        </form>
    );
};

export default FavoriteForm;
