import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import NavigationButtons from "@/Components/NavigationButtons";



// showBackButton: 「前のページに戻る」ボタンを表示するかどうか
// isAuthenticated: ユーザーが認証されているかどうか
const Layout = ({ children, showBackButton = false, isAuthenticated = false }) => {
    // 現在のページがトップページかどうかを判定
    const isTopPage = window.location.pathname === '/';
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
            <NavigationButtons
                showBackButton={showBackButton}
                isAuthenticated={isAuthenticated}
                isTopPage={isTopPage}
            />
            <Footer />
        </div>
    );
};

export default Layout;