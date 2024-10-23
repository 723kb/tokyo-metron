import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import ActionLink from "@/Components/ActionLink";
import InputField from "@/Components/InputField";

export default function Login({ status, canResetPassword }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title={t("log_in")} />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}
            <div className="w-full sm:max-w-2xl mx-auto mt-10 md:mt-20 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <form onSubmit={submit}>
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

                    <div className="block mt-4">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                            />
                            <span className="ms-2 text-sm text-gray-600">
                                {t("remember_me")}
                            </span>
                        </label>
                    </div>

                    <div className="flex items-center justify-around mt-4">
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {t("Forgot your password?")}
                            </Link>
                        )}

                        <ActionLink
                            onClick={submit}
                            className="font-semibold bg-blue-500 text-white hover:bg-blue-700 focus:bg-blue-500 active:bg-blue-700"
                            disabled={processing}
                        >
                            <span className="block w-full">{t("log_in")}</span>
                        </ActionLink>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
