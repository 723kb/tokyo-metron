import React from "react";
import { useForm } from "@inertiajs/react";
import ActionLink from "@/Components/ActionLink";
import FormField from "@/Components/FormField";

/**
 * お気に入り路線のフォームコンポーネント
 *
 * お気に入り路線の登録と編集の両方に使用。
 * @param {Object} props コンポーネントのプロパティ
 * @param {Array} props.lines 選択可能な路線のリスト
 * @param {Array} props.initialSelectedLines 初期状態で選択されている路線のIDリスト
 * @param {string} props.submitRoute フォーム送信先のルート名
 * @param {string} props.submitMethod 送信に使用するHTTPメソッド（'post'または'put'）
 * @param {string} props.submitButtonText 送信ボタンに表示するテキスト
 * @param {string} props.submitButtonClass 送信ボタンに適用するCSSクラス
 * @returns {JSX.Element} フォームコンポーネント
 */
const FavoriteForm = ({
    lines,
    initialSelectedLines,
    submitRoute,
    submitMethod,
    submitButtonText,
    submitButtonClass,
}) => {
    // useFormフックを使用してフォームの状態を管理
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
     * フォーム送信時の処理
     *
     * @param {Event} e - フォーム送信イベント
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        submit(route(submitRoute));
    };

    /**
     * チェックボックスの状態変更時の処理
     *
     * @param {number} lineId - 変更された路線のID
     */
    const handleCheckboxChange = (lineId) => {
        const updatedLines = data.selectedLines.includes(lineId) // 変更された路線IDが既に選択されているかチェック
            ? data.selectedLines.filter((id) => id !== lineId) // チェックが外れた時：lineId以外の全ての要素を含む新しい配列を作成 = 配列から削除
            : [...data.selectedLines, lineId]; // チェックされた時：現在のselectedLines配列の全要素をコピー→新しいlineIdを追加した新しい配列を作成
        setData("selectedLines", updatedLines);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <p className="block font-medium text-gray-700 mb-2 text-center">
                    路線を選択してください。すでに登録済みのものにはチェックが入っています。
                </p>
                {/* 路線のリストをマップして各路線のチェックボックスを表示 */}
                {lines.map((line) => (
                    <FormField
                        key={line.id}
                        id={`line-${line.id}`}
                        label={line.name}
                        type="checkbox"
                        value={data.selectedLines.includes(line.id)}
                        onChange={() => handleCheckboxChange(line.id)}
                        style={{ backgroundColor: line.color_code }}
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
                {/* 登録ボタン or 編集ボタン */}
                <ActionLink
                    onClick={handleSubmit}
                    disabled={processing}
                    className={submitButtonClass}
                >
                    {submitButtonText}
                </ActionLink>
            </div>
        </form>
    );
};

export default FavoriteForm;