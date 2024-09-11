import OperationStatus from "@/Components/OperationStatus";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";

const Main = () => {
    
    /**
     * メインページコンポーネント
     *
     * 運行状況の表示と機能説明を含むメインページを表示する
     */
    const [lastUpdateTime, setLastUpdateTime] = useState(null);

    /**
     * 最終更新時刻を更新するハンドラー関数
     *
     * @param {string} time - 更新時刻
     */
    const handleLastUpdateTime = (time) => {
        setLastUpdateTime(time);
    };
    
    return (
        <Authenticated>
            <Head title="メイン" />
            
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
        </Authenticated>
    );
};

export default Main;
