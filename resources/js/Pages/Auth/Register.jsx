import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

/**
 * 会員登録フォームコンポーネント
 *
 * @returns {JSX.Element} 会員登録フォーム
 */
export default function Register() {
    const { t } = useTranslation();

    /**
     * フォームの状態管理
     *
     * @type {Object}
     * @property {Object} data - 入力フィールドの値
     *  @property {Function} setData - データ更新関数
     * @property {Function} post - 確認画面へのデータ送信関数
     * @property {boolean} processing - 送信中の状態
     * @property {Object} errors - バリデーションエラー
     * @property {Function} reset - パスワードフィールドのリセット関数
     */
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    /**
     * セッションストレージから登録データを復元する
     * 会員登録確認画面から「修正」で戻った場合に使用
     */
    useEffect(() => {
        // コンポーネントマウント時にセッションストレージからデータを読み込む
        const storedData = sessionStorage.getItem("registerData");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setData((prevData) => ({
                ...prevData,
                ...parsedData,
            }));
            // データを使用したらセッションストレージから削除
            sessionStorage.removeItem("registerData");
        }
    }, []);

    // コンポーネントのアンマウント時にパスワードフィールドをリセット
    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    /**
     * フォーム送信処理
     *
     * @param {Event} e - フォーム送信イベント
     */
    const submit = (e) => {
        e.preventDefault();
        // 確認画面へのルートにPOSTリクエストを送信
        post(route("register.confirm"), data, {
            preserveState: true,
            onSuccess: (page) => {
                // 確認画面コンポーネントが返された場合、そのURLに遷移
                if (page.component === "Auth/RegisterConfirm") {
                    window.location.href = page.url;
                }
            },
        });
    };

    return (
        <GuestLayout>
            <Head title={t("Register")} />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value={t("Name")} />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value={t("Email")} />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value={t("Password")} />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value={t("Confirm Password")}
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route("login")}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {t("Already registered?")}
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        {t("Confirm")}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}