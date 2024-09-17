import Header from "@/Layouts/Header";
import Footer from "@/Layouts/Footer";
import { usePage } from "@inertiajs/react";
import HeroSection from "@/Components/HeroSection";
import NavigationButton from "@/Components/NavigationButton";

/**
 * 非ログイン時のレイアウトコンポーネント
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {React.ReactNode} props.children - 子コンポーネント
 * @returns {JSX.Element} ゲストレイアウトを含むReactコンポーネント
 */
export default function GuestLayout({ children }) {
    
    /**
     * 現在のURLを取得
     *
     * @type {string}
     */
    const { url } = usePage();
    
    /**
     * TOPページか判断
     *
     * @type {boolean}
     */
    const isTopPage = url === "/"; 

    /**
    * ユーザーが認証されているかどうかを判断
     *
     * authオブジェクトのuserプロパティがnullでない場合 = 認証済み
     *
     * @type {boolean}
     */
    const isAuthenticated = usePage().props.auth.user !== null;

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <HeroSection
                        title="トーキョーめとろん"
                        subtitle="東京メトロ運行状況共有サービス"
                        imageSrc="/images/Hero.png"
                    />
                    
                        {children}
                    
                    {/* トップページ以外でナビゲーションボタンを表示 */}
                    {!isTopPage && (
                        <div className="flex justify-center mt-4">
                            <NavigationButton
                                isAuthenticated={isAuthenticated}
                            />
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}