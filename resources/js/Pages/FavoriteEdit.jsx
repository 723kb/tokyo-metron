import Authenticated from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { Head } from "@inertiajs/react";
import FavoriteForm from "@/Components/FavoriteForm";

/**
 * お気に入り路線更新コンポーネント
 *
 * @param {Object} props
 * @param {Array} props.lines 選択可能な全路線のリスト。各路線オブジェクトには
 *        id, name, color_code などの属性が含まれる。
 * @param {Array} props.favoriteLineIds 現在のお気に入り路線IDのリスト。
 *        ユーザーが既に選択している路線のIDが含まれる。
 */
const FavoriteEdit = ({ lines = [], favoriteLineIds = [] }) => {
    return (
        <Authenticated>
            <Head title="お気に入り更新" />

            <div className="py-12">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <h1 className="text-2xl font-bold mb-4">
                            お気に入り更新
                        </h1>
                        {/* FavoriteFormコンポーネントを使用してフォームを表示 */}
                        <FavoriteForm
                            lines={lines} // 選択可能な全路線のリスト
                            initialSelectedLines={favoriteLineIds} // 初期状態で選択されている路線のID
                            submitRoute="favorites.update" // フォーム送信先のルート名
                            submitMethod="put" // 更新のためPUTメソッドを使用
                            submitButtonText="更新" // 送信ボタンのテキスト
                            submitButtonClass="bg-green-600 hover:bg-green-400 text-white font-semibold" // 送信ボタンのスタイル
                        />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default FavoriteEdit;