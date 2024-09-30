import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import React from "react";
import { Head } from "@inertiajs/react";

const MyPage = () => {
    return (
        <Authenticated>
            <Head title="マイページ" />

            <div className="py-2 sm:py-12">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-gray-50 border-b border-gray-200">
                        <h1 className="border-b border-gray-200 text-2xl font-bold pb-4 mb-4">
                            マイページ
                        </h1>
                        <ul className="space-y-10">
                            <li>
                                <Link
                                    href={route("profile.edit")}
                                    className="hover:text-slate-600 hover:underline"
                                >
                                    会員情報照会
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route("favorites.index")}
                                    className="hover:text-slate-600 hover:underline"
                                >
                                    お気に入り
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-slate-600 hover:underline"
                                >
                                    通知設定
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default MyPage;
