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
    return (
        <div className="flex items-center">
            <Link href={isAuthenticated ? route("main") : route("top")}>
                <img
                    src="/images/HeaderLogo.png"
                    alt="トーキョーめとろんロゴ"
                    className="w-[100px] mr-2"
                />
            </Link>
            <h1 className="text-2xl font-bold">トーキョーめとろん</h1>
        </div>
    );
};

export default Logo;