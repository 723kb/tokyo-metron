import React from "react";
import { useForm } from "@inertiajs/react";
import TrashIcon from "@/Components/TrashIcon";

/**
 * お気に入り路線のリストを表示するコンポーネント
 *
 * @param {Object} props
 * @param {Array} props.favorites - お気に入り路線のリスト
 * @param {Function} props.onDeleteSuccess - 削除成功時のコールバック関数
 * @param {Function} props.onDeleteError - 削除失敗時のコールバック関数
 */
const FavoritesListComponent = ({
    favorites,
    onDeleteSuccess,
    onDeleteError,
}) => {
    // useFormフックを使用して削除機能を管理
    const { delete: destroy } = useForm();

    /**
     * お気に入り削除処理
     * @param {number} id - 削除するお気に入りのID
     */
    const handleDelete = (id) => {
        if (confirm("このお気に入りを削除してもよろしいですか？")) {
            destroy(route("favorites.destroy", id), {
                preserveState: true,
                preserveScroll: true,
                onSuccess: onDeleteSuccess,
                onError: onDeleteError,
            });
        }
    };

    // お気に入りがない場合のメッセージを表示
    if (favorites.length === 0) {
        return <p className="p-6">お気に入りの路線はありません。</p>;
    }

    // お気に入り路線のリストを表示
    return (
        <div className="flex flex-col">
            {favorites.map((favorite) => (
                <div key={favorite.id} className="relative p-2">
                    <div
                        className="flex items-center justify-between text-lg font-semibold py-2 px-4 rounded"
                        style={{
                            backgroundColor: favorite.line.color_code,
                            color: "white",
                        }}
                    >
                        {/* 路線名を表示 */}
                        {favorite.line.name}
                        {/* 削除ボタン */}
                        <button
                            onClick={() => handleDelete(favorite.id)}
                            className="hover:text-black text-slate-100 font-bold py-1 px-2 rounded text-sm"
                        >
                            <TrashIcon />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FavoritesListComponent;
