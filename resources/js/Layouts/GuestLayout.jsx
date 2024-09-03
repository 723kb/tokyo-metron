import Header from "./Header";
import Footer from "./Footer";
import { usePage } from "@inertiajs/react";
import HeroSection from "@/Components/HeroSection";
import NavigationButtons from "@/Components/NavigationButtons";

export default function GuestLayout({ children }) {
    const { url } = usePage(); // 現在のURLを取得
    const isTopPage = url === "/"; // TOPページか判断

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
                    <div className="w-full sm:max-w-md mx-auto px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                        {children}
                    </div>
                    {/* TOPページ以外ならTOPへ戻るボタンを表示 */}
                    <NavigationButtons
                        showBackButton={!isTopPage}
                        isAuthenticated={false}
                        isTopPage={isTopPage}
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}