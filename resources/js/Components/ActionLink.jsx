import React from "react";
import { Link } from "@inertiajs/react";

/**
 * アクションリンクコンポーネント
 *
 * ボタンスタイルのリンクまたはボタンを表示。
 * 主に前のページに戻る画面遷移や特定のアクションを実行するために使用。
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {string} [props.href] - リンクのURL
 * @param {Function} [props.onClick] - クリック時のコールバック関数
 * @param {React.ReactNode} props.children - ボタン/リンクのテキストまたは内容
 * @param {string} [props.className=""] - 追加のCSSクラス
 * @param {boolean} [props.preserveState=true] - 状態を保持するかどうか
 * @returns {JSX.Element} アクションリンクまたはボタン
 */
const ActionLink = ({
    href,
    onClick,
    children,
    className = "",
    preserveState = true,
}) => {
    const baseClasses =
        "inline-flex items-center px-4 py-2 border  rounded-md uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 w-36 text-center";

    // onClickプロパティの場合、ボタンとして描画
    if (onClick) {
        return (
            <button
                onClick={onClick}
                className={`${baseClasses} ${className || "bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-700"}`}
                type="button"
            >
                {children}
            </button>
        );
    }

    // onClickがない場合、Linkコンポーネントとして描画
    return (
        <Link
            href={href}
            className={`${baseClasses} ${className || "bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-700"}`}
            preserveState={preserveState}
        >
            {children}
        </Link>
    );
};

export default ActionLink;