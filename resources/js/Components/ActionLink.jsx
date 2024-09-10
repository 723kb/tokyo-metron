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
        "inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150";

    // onClickプロパティの場合、ボタンとして描画
    if (onClick) {
        return (
            <button onClick={onClick} className={`${baseClasses} ${className}`} type="button">
                {children}
            </button>
        );
    }

    // onClickがない場合、Linkコンポーネントとして描画
    return (
        <Link
            href={href}
            className={`${baseClasses} ${className}`}
            preserveState={preserveState}
        >
            {children}
        </Link>
    );
};

export default ActionLink;