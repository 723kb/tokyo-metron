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
 * @param {function} onLastUpdateTime - 最終更新時刻を親コンポーネントに通知する関数
 * @returns {JSX.Element} 路線状況一覧を表示するコンポーネント
 */
const OperationStatus = ({ onLastUpdateTime }) => {
    const [lines, setLines] = useState([]); // 路線情報の状態管理
    const [loading, setLoading] = useState(true); // ローディングの状態管理
    const [error, setError] = useState(null); // エラー情報の状態管理
    const { auth } = usePage().props; // 認証情報を取得

    /**
     * APIから路線情報を取得する非同期関数
     *
     * APIからデータを取得し、状態を更新します。(丸ノ内線支線は除外)
     * エラーが発生した場合はエラー状態を設定します。
     */
    const fetchLines = async () => {
        try {
            // APIからデータを取得
            const response = await axios.get("/lines-with-latest-status");
            // 丸ノ内線支線を除外してstateを更新
            const filteredLines = response.data.filter(
                (line) => line.name !== "丸ノ内線支線",
            );
            setLines(filteredLines);
            setLoading(false);

            // 現在時刻を取得して更新時間とする
            const lastUpdateTime = new Date().toLocaleString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            });

            // 親コンポーネントに最終更新時刻を通知
            if (typeof onLastUpdateTime === "function") {
                onLastUpdateTime(lastUpdateTime);
            }
        } catch (error) {
            console.error("Error fetching lines:", error);
            setError("路線情報の取得に失敗しました。");
            setLoading(false);
        }
    };

    // コンポーネントのマウント時とその後5分ごとにデータを更新
    useEffect(() => {
        fetchLines();
        // 5分ごとにデータを更新
        const intervalId = setInterval(fetchLines, 5 * 60 * 1000);
        // クリーンアップ関数：コンポーネントのアンマウント時にインターバルをクリア
        return () => clearInterval(intervalId);
    }, []);

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