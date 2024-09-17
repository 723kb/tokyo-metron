import { usePage } from "@inertiajs/react";
import Header from "@/Layouts/Header";
import Footer from "@/Layouts/Footer"
import HeroSection from "@/Components/HeroSection";
import NavigationButton from "@/Components/NavigationButton";
import ActionLink from "@/Components/ActionLink";

/**
 * ログイン時のレイアウトコンポーネント
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {React.ReactNode} props.children - 子コンポーネント
 * @returns {JSX.Element} 認証済みユーザー向けレイアウトを含むReactコンポーネント
 */
export default function Authenticated({ children }) {
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
                    {/* メインページ以外で「戻る」「メインに戻る」ボタンを表示 */}
                    {!isMainPage && (
                        <div className="flex justify-center my-4">
                            <ActionLink
                                onClick={() => window.history.back()}
                                className="bg-indigo-200 hover:bg-indigo-300 focus:bg-indigo-300 active:bg-indigo-400 mr-4 font-normal"
                            >
                                戻る
                            </ActionLink>
                            <NavigationButton isAuthenticated={true} />
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}