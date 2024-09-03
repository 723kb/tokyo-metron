import { usePage } from "@inertiajs/react";
import Header from "./Header";
import Footer from "./Footer";
import HeroSection from "@/Components/HeroSection";
import NavigationButtons from "@/Components/NavigationButtons";

export default function Authenticated({ children }) {
    // 現在のURLを取得
    const { url } = usePage();
    // メインページかどうかを判定
    const isMainPage = url === "/main";

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* メインページの場合のみヒーローセクションを表示 */}
                    {isMainPage && (
                        <HeroSection
                            title="トーキョーめとろん"
                            subtitle="東京メトロ運行状況共有サービス"
                            imageSrc="/images/Hero.png"
                        />
                    )}
                    {children}
                    {/* メインページ以外の場合、ナビゲーションボタンを表示 */}
                    {!isMainPage && (
                        <NavigationButtons
                            showBackButton={true}
                            isAuthenticated={true}
                            isTopPage={false}
                        />
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
