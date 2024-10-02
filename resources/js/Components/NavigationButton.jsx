import React from "react";
import { Link } from "@inertiajs/react";
import ActionLink from "./ActionLink";

/**
 * ナビゲーションボタンコンポーネント
 *
 * ユーザーの認証状態に応じて、トップページorメインページへの
 * リンクを提供するボタンを表示。
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {boolean} props.isAuthenticated - ユーザーの認証状態
 * @returns {JSX.Element} 認証状態に応じたナビゲーションボタン
 */
const NavigationButton = ({ isAuthenticated }) => (
    <ActionLink
        href={isAuthenticated ? route("main") : route("top")}
        className="bg-gray-100 border border-gray-300 text-gray-800 hover:bg-gray-200 hover:text-gray-900 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 inline-flex items-center px-4 py-2 rounded-md uppercase tracking-widest transition ease-in-out duration-150"
    >
        <span className="block w-full">
            {isAuthenticated ? "メインに戻る" : "トップに戻る"}
        </span>
    </ActionLink>
);

export default NavigationButton;