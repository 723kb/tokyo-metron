import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import Logo from "@/Components/Logo";
import NavigationMenu from "@/Components/NavigationMenu";
import UserMenu from "@/Components/UserMenu";
import AuthLinks from "@/Components/AuthLinks";
import MobileMenuButton from "@/Components/MobileMenuButton";
import MobileMenu from "@/Components/MobileMenu";

/**
 * ヘッダーコンポーネント
 *
 * ロゴ、ナビゲーションメニュー、ユーザーメニューor認証リンクを含む。
 * モバイル表示時にはハンバーガーメニューとなる。
 *
 * @returns {JSX.Element} ヘッダーコンポーネント
 */
const Header = () => {
    /**
     * 現在のページのプロパティを取得
     *
     * @type {{auth: {user: Object|null}}}
     */
    const { auth } = usePage().props;

    /**
     * ユーザーが認証されているかどうかを判断
     *
     * authオブジェクトのuserプロパティがnullでない場合 = 認証済み
     *
     * @type {boolean}
     */
    const isAuthenticated = auth.user !== null;

    /**
     * モバイルメニューの開閉状態を管理
     *
     * @type {[boolean, function]} useState hook
     */
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="w-full bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-2 sm:py-4"> {/* パディングを調整 */}
                    <Logo isAuthenticated={isAuthenticated} />
                    {/* デスクトップナビゲーション */}
                    <div className="hidden md:flex items-center space-x-4">
                        <NavigationMenu />
                        {isAuthenticated ? (
                            <UserMenu user={auth.user} />
                        ) : (
                            <AuthLinks />
                        )}
                    </div>
                    {/* モバイルメニューボタン */}
                    <div className="md:hidden">
                        <MobileMenuButton
                            isOpen={isMenuOpen}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2"
                        />
                    </div>
                </div>
            </div>
            {/* モバイルメニュー（開いている場合のみ表示） */}
            {isMenuOpen && (
                <MobileMenu isAuthenticated={isAuthenticated} auth={auth} />
            )}
        </header>
    );
};

export default Header;