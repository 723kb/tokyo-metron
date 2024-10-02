import { usePage } from "@inertiajs/react";
import Header from "./Header";
import Footer from "./Footer";
import HeroSection from "@/Components/HeroSection";
import NavigationButton from "@/Components/NavigationButton";
import SecondaryButton from "@/Components/SecondaryButton";
import ActionLink from "@/Components/ActionLink";

/**
 * ログイン時のレイアウトコンポーネント
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {React.ReactNode} props.children - 子コンポーネント
 * @returns {JSX.Element} 認証済みユーザー向けレイアウトを含むReactコンポーネント
 */
export default function Authenticated({
    children,
    backUrl,
    hideBackButton = false,
}) {
    /**
     * 現在のURLを取得
     *
     * @type {string}
     */
    const { url } = usePage();

    /**
     * メインページかどうかを判定
     *
     * @type {boolean}
     */
    const isMainPage = url === "/main" || url === "/";

    /** 「戻る」で戻る先を指定 */
    const handleBack = () => {
        if (backUrl) {
            window.location.href = backUrl;
        } else {
            window.history.back(); // 指定がなければブラウザの履歴を元に戻る
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
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
                </div>
            </main>
            {/* メインページ以外で「戻る」「メインに戻る」ボタンを表示 */}
            {!isMainPage && (
                <div className="flex justify-center my-4">
                    {!hideBackButton && (
                        <ActionLink
                            onClick={handleBack}
                            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mr-4"
                        >
                            <span className="block w-full">戻る</span>
                        </ActionLink>
                    )}
                    <NavigationButton isAuthenticated={true} />
                </div>
            )}
            <Footer />
        </div>
    );
}
