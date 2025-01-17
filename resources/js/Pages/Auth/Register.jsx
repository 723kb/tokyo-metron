import { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import ErrorDisplay from "@/Components/ErrorDisplay";
import ActionLink from "@/Components/ActionLink";
import InputField from "@/Components/InputField";

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
     * フォーム全体のエラー表示メッセージ
     *
     * @type {string}
     */
    const [globalError, setGlobalError] = useState("");

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

    // フォームエラーに応じてフォーカスを設定する
    useEffect(() => {
        if (errors.name) {
            document.getElementById("name").focus();
        } else if (errors.email) {
            document.getElementById("email").focus();
        } else if (errors.password) {
            document.getElementById("password").focus();
        } else if (errors.password_confirmation) {
            document.getElementById("password_confirmation").focus();
        }

        // 全体エラーをチェック
        if (Object.keys(errors).length > 0) {
            setGlobalError("入力内容にエラーがあります。修正してください。");
        } else {
            setGlobalError("");
        }
    }, [errors]);

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
            onError: () => {
                // エラーメッセージをセット
                setGlobalError(
                    "登録に失敗しました。以下のエラーを修正してください。",
                );

                // 各フィールドのエラーメッセージを設定
                Object.keys(errors).forEach((field) => {
                    setData(field, data[field], { error: errors[field] });
                });

                // エラーがある最初のフィールドにフォーカスを当てる
                const firstErrorField = Object.keys(errors)[0];
                if (firstErrorField) {
                    document.getElementById(firstErrorField)?.focus();
                }
            },
        });
    };

    return (
        <GuestLayout>
            <Head title={t("Register")} />

            <div className="w-full sm:max-w-2xl mx-auto mt-10 md:mt-20 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <form onSubmit={submit}>
                    <ErrorDisplay message={globalError} />

                    <InputField
                        id="name"
                        label={t("Name")}
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        error={errors.name}
                        placeholder="めとろん"
                    />

                    <InputField
                        id="email"
                        label={t("Email")}
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        error={errors.email}
                        placeholder="example@example.com"
                    />

                    <InputField
                        id="password"
                        label="パスワード(半角英数8文字以上)"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        error={errors.password}
                        placeholder="Password123"
                    />

                    <InputField
                        id="password_confirmation"
                        label={t("Confirm Password")}
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        error={errors.password_confirmation}
                        placeholder="Password123"
                    />

                    <div className="flex items-center justify-around mt-4">
                        <Link
                            href={route("login")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {t("Already registered?")}
                        </Link>

                        <ActionLink
                            onClick={submit}
                            className="font-semibold bg-blue-500  border-blue-500 text-white hover:bg-blue-700 focus:bg-blue-500 active:bg-blue-700"
                            disabled={processing}
                        >
                            <span className="block w-full">確認</span>
                        </ActionLink>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
