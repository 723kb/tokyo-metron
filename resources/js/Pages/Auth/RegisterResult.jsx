import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage, Link } from "@inertiajs/react";

/**
 * 会員登録結果画面コンポーネント
 * 会員登録が完了したことを表示し、登録内容を確認できる画面
 *
 * @returns {JSX.Element} 会員登録結果画面
 */
export default function RegisterResult() {
    /**
     * ページプロップスから会員登録データを取得
     *
     * @type {{name: string, email: string}}
     */
    const { name, email } = usePage().props.data;

    return (
        <GuestLayout>
            <Head title="会員登録結果" />

            <div className="w-full sm:max-w-md mx-auto mt-10 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    会員登録結果
                </h2>
                <div className="mb-6 text-sm text-gray-600 text-center">
                    以下の内容で登録が完了しました。
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between border-b pb-2">
                        <strong className="text-gray-700">名前:</strong>
                        <span>{name}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <strong className="text-gray-700">
                            メールアドレス:
                        </strong>
                        <span>{email}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <strong className="text-gray-700">パスワード:</strong>
                        <span>非表示にしています</span>
                    </div>
                </div>
                <div className="mt-8 flex justify-center space-x-4">
                    <Link
                        href={route("login")}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        ログイン
                    </Link>
                </div>
            </div>
        </GuestLayout>
    );
}