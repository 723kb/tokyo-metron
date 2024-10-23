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
    const themeColor = favorites.length === 0 ? "blue" : "green";
    const btnText = favorites.length === 0 ? "登録" : "更新";
    const routeName =
        favorites.length === 0 ? "favorites.create" : "favorites.edit";

    return (
        <ActionLink
            href={route(routeName)}
            className={`font-semibold bg-${themeColor}-500 text-white hover:bg-${themeColor}-700 focus:bg-${themeColor}-500 active:bg-${themeColor}-700`}
        >
            <span className="block w-full">{btnText}</span>
        </ActionLink>
    );
};

export default ActionButton;
