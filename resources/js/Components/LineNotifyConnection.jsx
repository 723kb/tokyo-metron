import React from "react";

/**
 * LINE Notify連携状況を表示し、連携・解除機能を提供するコンポーネント
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {boolean} props.isConnected - LINE Notifyとの連携状態
 * @param {string} props.connectUrl - LINE Notify連携用のURL
 * @param {Function} props.onDisconnect - LINE Notify連携解除時のコールバック関数
 * @returns {JSX.Element} LINE Notify連携コンポーネント
 */
const LineNotifyConnection = ({ isConnected, connectUrl, onDisconnect }) => {
    /**
     * LINE Notify連携ボタンのクリックハンドラ
     * 新しいウィンドウでLINE Notify連携ページを開く
     */
    const handleConnect = () => {
        window.open(connectUrl, "_blank", "noopener,noreferrer");
    };

    return (
        // LINE Notify 連携状況を表示するコンテナ
        <div className="mb-4 p-4 border-b rounded">
            <h2 className="text-xl font-semibold mb-2">LINE Notify 連携</h2>
            {isConnected ? (
                // LINE Notifyと連携済みの場合
                <>
                    <p className="text-green-600 mb-2">
                        LINE Notifyと連携済みです
                    </p>
                    <button
                        onClick={onDisconnect}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        LINE Notify連携を解除
                    </button>
                </>
            ) : (
                // LINE Notifyと未連携の場合
                <>
                    <p className="mb-2">
                        通知を受け取るにはLINE Notifyとの連携が必要です
                    </p>
                    <button
                        onClick={handleConnect}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        LINE Notifyと連携する
                    </button>
                </>
            )}
        </div>
    );
};

export default LineNotifyConnection;
