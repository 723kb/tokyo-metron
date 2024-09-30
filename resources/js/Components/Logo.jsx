import React from "react";
import { Link } from "@inertiajs/react";

/**
 * ヘッダーロゴコンポーネント
 *
 * ユーザーの認証状態に応じて、ロゴクリック時の遷移先が
 * トップページorメインページに変わる。
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {boolean} props.isAuthenticated - ユーザーの認証状態
 * @returns {JSX.Element} ロゴとサイト名を含むヘッダー部分
 */
const Logo = ({ isAuthenticated }) => {
    // 環境変数を使用して画像のフルパスを生成
    const logoSrc = `${import.meta.env.VITE_APP_URL}/images/HeaderLogo.png`;

    return (
        <div className="flex items-center">
            <Link href={isAuthenticated ? route("main") : route("top")}>
                <img
                    src={logoSrc}
                    alt="トーキョーめとろんロゴ"
                    className="w-[60px] sm:w-[80px] md:w-[100px] mr-2"
                />
            </Link>
            <h1 className="text-md sm:text-xl md:text-2xl font-bold">
                トーキョーめとろん
            </h1>
        </div>
    );
};

export default Logo;
