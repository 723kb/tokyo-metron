import React from "react";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";

const MobileMenu = ({ isAuthenticated, auth }) => {
    return (
        <div className="md:hidden border-t border-gray-200">
            {/* ログイン済みの場合、ユーザー名を表示 */}
            {isAuthenticated && (
                <div className="px-4 py-3 border-b border-gray-200">
                    <div className="text-base font-medium text-gray-800">
                        {auth.user.name}
                    </div>
                </div>
            )}
            {/* 共通のナビゲーションリンク */}
            <ResponsiveNavLink href="#" active={route().current("how-to-use")}>
                使い方
            </ResponsiveNavLink>
            <ResponsiveNavLink href="#" active={route().current("contact")}>
                お問い合わせ
            </ResponsiveNavLink>
            {/* 認証状態に応じて表示するメニュー項目を切り替え */}
            {isAuthenticated ? (
                <>
                    {/* ログイン済みユーザー向けのメニュー項目 */}
                    <ResponsiveNavLink
                        href={route("mypage.index")}
                        active={route().current("mypage.index")}
                    >
                        マイページ
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        href={route("logout")}
                        method="post"
                        as="button"
                    >
                        ログアウト
                    </ResponsiveNavLink>
                </>
            ) : (
                <>
                    {/* 非ログインユーザー向けのメニュー項目 */}
                    <ResponsiveNavLink
                        href={route("login")}
                        active={route().current("login")}
                    >
                        ログイン
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        href={route("register")}
                        active={route().current("register")}
                    >
                        会員登録
                    </ResponsiveNavLink>
                </>
            )}
        </div>
    );
};

export default MobileMenu;