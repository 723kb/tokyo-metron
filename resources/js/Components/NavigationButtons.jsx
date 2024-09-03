import React from "react";
import { Link } from "@inertiajs/react";

// showBackButton: 「前のページに戻る」ボタンを表示するかどうか
// isAuthenticated: ユーザーが認証されているかどうか
// isTopPage: 現在のページがトップページかどうか
const NavigationButtons = ({ showBackButton, isAuthenticated, isTopPage }) => {
    // トップページの場合はナビゲーションボタンを表示しない
    if (isTopPage) return null;

    return (
        <div className="flex justify-center mt-4">
            {/* showBackButtonがtrueなら戻るボタンを表示 */}
            {showBackButton && (
                <button
                    onClick={() => window.history.back()}
                    className="mr-4 px-4 py-2 bg-gray-200 rounded"
                >
                    戻る
                </button>
            )}
            {/* 「トップに戻る」または「メインに戻る」リンク */}
            <Link
                // 認証状態に応じてリンク先を変更
                href={isAuthenticated ? route("main") : route("top")}
                className="px-4 py-2 bg-gray-200 rounded"
            >
                {/* 認証状態に応じてテキストを変更 */}
                {isAuthenticated ? "メインに戻る" : "トップに戻る"}
            </Link>
        </div>
    );
};

export default NavigationButtons;