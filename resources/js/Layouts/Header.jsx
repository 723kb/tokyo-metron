import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import Logo from "@/Components/Logo";
import NavigationMenu from "@/Components/NavigationMenu";
import UserMenu from "@/Components/UserMenu";
import AuthLinks from "@/Components/AuthLinks";
import MobileMenuButton from "@/Components/MobileMenuButton";
import MobileMenu from "@/Components/MobileMenu";

const Header = () => {
    // usePage()フックを使用して、現在のページのプロパティを取得
    const { auth } = usePage().props;
    // ユーザーが認証されているかどうかを判断
    // auth.userがnullでない場合 = 認証済み
    const isAuthenticated = auth.user !== null;
    // モバイルメニューの開閉状態を管理
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="w-full bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <Logo />
                    {/* デスクトップナビゲーション */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* 共通のナビゲーションメニュー */}
                        <NavigationMenu />
                        {/* 認証状態に応じてユーザーメニューor認証リンクを表示 */}
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