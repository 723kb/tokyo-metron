import Authenticated from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { Head } from "@inertiajs/react";
import FavoriteForm from "@/Components/FavoriteForm";

/**
 * お気に入り路線登録コンポーネント
 *
 * @param {Object} props
 * @param {Array} props.lines - 選択可能な路線のリスト。各路線オブジェクトには
 *        id, name, color_code などの属性が含まれる。
 */
const FavoriteCreate = ({ lines = [] }) => {
    return (
        <Authenticated backUrl="/favorites">
            <Head title="お気に入り登録" />

            <div className="py-2 sm:py-12">
                <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <h1 className="text-2xl font-bold mb-4">
                            お気に入り登録
                        </h1>
                        {/* FavoriteFormコンポーネントを使用してフォームを表示 */}
                        <FavoriteForm lines={lines} />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default FavoriteCreate;
