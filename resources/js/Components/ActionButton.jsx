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
                className="font-semibold bg-blue-500 text-white hover:bg-blue-700 focus:bg-blue-500 active:bg-blue-700"
            >
                <span className="block w-full">登録</span>
            </ActionLink>
        );
    }

    // お気に入りが1つ以上登録されている場合
    return (
        <ActionLink
            href={route("favorites.edit")}
            className="font-semibold bg-green-500 text-white hover:bg-green-700 focus:bg-green-500 active:bg-green-700"
        >
            <span className="block w-full">更新</span>
        </ActionLink>
    );
};

export default ActionButton;
