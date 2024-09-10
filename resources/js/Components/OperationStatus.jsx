import React, { useState, useEffect } from "react";
import axios from "axios";
import LineStatusCard from "@/Components/LineStatusCard";
import { usePage } from "@inertiajs/react";

/**
 * 路線の運行状況一覧を表示するコンポーネント
 *
 * APIから取得した路線情報を表示
 * ログイン中はカードコンポーネントから各路線のページへ遷移できる
 *
 * @returns {JSX.Element} 路線状況一覧を表示するコンポーネント
 */
const OperationStatus = () => {
    /**
     * @type {[Array<Object>, function]} 路線情報の状態と更新関数
     */
    const [lines, setLines] = useState([]);

    /**
     * @type {[boolean, function]} データ読み込み中かどうかの状態と更新関数
     */
    const [loading, setLoading] = useState(true);

    /**
     * @type {[string|null, function]} エラー情報の状態と更新関数
     */
    const [error, setError] = useState(null);

    /**
     * 取得した認証情報
     *
     * @type {Object} 認証情報を含むオブジェクト
     */
    const { auth } = usePage().props;

    /**
     * APIから路線情報を取得する非同期関数
     *
     * APIからデータを取得し、状態を更新します。(丸ノ内線支線は除外)
     * エラーが発生した場合はエラー状態を設定します。
     */
    useEffect(() => {
        const fetchLines = async () => {
            try {
                const response = await axios.get("/lines-with-latest-status");
                setLines(response.data);
                // 丸ノ内線支線を除外してstateを更新
                const filteredLines = response.data.filter(
                    (line) => line.name !== "丸ノ内線支線",
                );
                setLines(filteredLines);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching lines:", error);
                setError("路線情報の取得に失敗しました。");
                setLoading(false);
            }
        };

        fetchLines();
    }, []); // 空の依存配列で、コンポーネントが初めて表示される時に1回だけ実行

    // ローディング中の表示
    if (loading) return <div className="text-center py-4">読み込み中...</div>;
    // エラー時の表示
    if (error)
        return <div className="text-center py-4 text-red-500">{error}</div>;

    if (loading) return <div>読み込み中...</div>;
    if (error) return <div>{error}</div>;

    // 路線情報の表示
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lines.map((line) => (
                <LineStatusCard
                    key={line.id}
                    name={line.name}
                    lineColor={line.color_code}
                    status={line.status}
                    content={line.content}
                    isAuthenticated={auth.user !== null}
                />
            ))}
        </div>
    );
};

export default OperationStatus;