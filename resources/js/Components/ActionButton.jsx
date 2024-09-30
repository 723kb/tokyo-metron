import React from "react";
import ActionLink from "@/Components/ActionLink";

/**
 * お気に入り登録状況に応じたアクションボタンを表示するコンポーネント
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Array} props.favorites - お気に入りの配列
 * @returns {JSX.Element} アクションボタン
 */
const ActionButton = ({ favorites }) => {
    // お気に入りが登録されていない場合
    if (favorites.length === 0) {
        return (
            <ActionLink
                href={route("favorites.create")}
                className="bg-blue-600 hover:bg-blue-400 text-white font-semibold"
            >
                <span className="block w-full">登録</span>
            </ActionLink>
        );
    }

    // お気に入りが1つ以上登録されている場合
    return (
        <ActionLink
            href={route("favorites.edit")}
            className="bg-green-600 hover:bg-green-400 text-white font-semibold"
        >
            <span className="block w-full">更新</span>
        </ActionLink>
    );
};

export default ActionButton;
