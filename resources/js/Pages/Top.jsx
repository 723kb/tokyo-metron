import React, { useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import AuthLinks from "@/Components/AuthLinks";
import OperationStatus from "@/Components/OperationStatus";

/**
 * トップページコンポーネント
 *
 * 運行状況の表示と機能説明を含むトップページを表示する
 */
const Top = () => {
    const [lastUpdateTime, setLastUpdateTime] = useState(null);  // 最終更新時刻の状態管理

    /**
     * 最終更新時刻を更新するハンドラー関数
     *
     * @param {string} time - 更新時刻
     */
    const handleLastUpdateTime = (time) => {
        setLastUpdateTime(time);
    };

    return (
        <GuestLayout>
            <Head title="トーキョーめとろん" />

            {/* 運行状況 */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                        運行状況 {lastUpdateTime && (
                            <span className="text-sm text-gray-500 ml-2">
                                （{lastUpdateTime}時点）
                            </span>
                        )}
                    </h3>
                    <OperationStatus onLastUpdateTime={handleLastUpdateTime} />
                </div>
            </div>

            {/* 機能説明 */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        ログインすると下記の機能が利用できます。
                    </h3>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                1. 全路線の運行状況がチェックできる！
                            </dt>
                        </div>
                        <div className="bg-white px-4 py-5 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                2. 各路線の投稿にコメントができる！
                            </dt>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                3.
                                路線をお気に入り登録することで、すぐに情報がわかる！
                            </dt>
                        </div>
                        <div className="bg-white px-4 py-5 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                4.
                                お気に入り登録した路線の情報は、自分が好きなタイミングでも通知される！
                            </dt>
                        </div>
                    </dl>
                </div>
                {/* アクションボタン */}
                <div className="flex justify-center space-x-4 m-4">
                    <AuthLinks />
                </div>
            </div>
        </GuestLayout>
    );
};

export default Top;
