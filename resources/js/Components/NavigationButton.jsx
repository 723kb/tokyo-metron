import React from "react";
import { Link } from "@inertiajs/react";

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
    <Link
        href={isAuthenticated ? route("main") : route("top")}
        className="inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md  uppercase tracking-widest hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150 mr-4"
    >
        {/* 認証状態に応じてテキストを変更 */}
        {isAuthenticated ? "メインに戻る" : "トップに戻る"}
    </Link>
);

export default NavigationButton;