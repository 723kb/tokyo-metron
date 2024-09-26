import GuestLayout from "@/Layouts/GuestLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, useForm, usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";

/**
 * 会員登録確認画面コンポーネント
 *
 * 入力された会員情報を確認し、登録を行うための画面を表示します。
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Object} props.data - 会員登録フォームから渡された初期データ
 * @param {string} props.data.name - ユーザーの名前
 * @param {string} props.data.email - ユーザーのメールアドレス
 * @param {string} props.data.password - ユーザーのパスワード
 * @param {string} props.data.password_confirmation - 確認用パスワード
 * @returns {JSX.Element} 会員登録確認画面
 */
export default function RegisterConfirm() {
    // コントローラーから渡されたデータを取得
    const { data } = usePage().props;

    // データが存在しない場合のエラー処理
    if (!data) {
        return (
            <GuestLayout>
                <Head title="エラー" />
                <div>データが見つかりません。最初からやり直してください。</div>
                <Link href={route("register")}>会員登録画面に戻る</Link>
            </GuestLayout>
        );
    }

    const { post, processing } = useForm();

    /**
     * 修正ボタンのクリックハンドラ
     * 会員登録フォーム画面に戻る際、入力データをセッションストレージに保存する
     */
    const handleEdit = () => {
        // セッションストレージにデータを保存
        sessionStorage.setItem(
            "registerData",
            JSON.stringify({
                name: data.name,
                email: data.email,
                // パスワードはセキュリティ上の理由から保存しない
            }),
        );
        router.get(route("register"));
    };

    /**
     * フォーム送信ハンドラ
     *
     * @param {Event} e - フォーム送信イベント
     */
    const submit = (e) => {
        e.preventDefault();
        post(route("register.store"));
    };

    return (
        <GuestLayout>
            <Head title="会員登録確認" />

            <div className="w-full sm:max-w-md mx-auto mt-10 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    会員登録確認
                </h2>
                <div className="mb-6 text-sm text-gray-600 text-center">
                    以下の内容で登録します。
                </div>
                <form onSubmit={submit} method="POST">
                    <div className="space-y-4">
                        <div className="flex justify-between border-b pb-2">
                            <strong className="text-gray-700">名前:</strong>
                            <span>{data.name}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <strong className="text-gray-700">
                                メールアドレス:
                            </strong>
                            <span>{data.email}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <strong className="text-gray-700">
                                パスワード:
                            </strong>
                            <span>非表示にしています</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <strong className="text-gray-700">
                                パスワード(確認用):
                            </strong>
                            <span>非表示にしています</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-8">
                        <SecondaryButton onClick={handleEdit} type="button">
                            修正
                        </SecondaryButton>
                        <PrimaryButton disabled={processing}>
                            登録
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}