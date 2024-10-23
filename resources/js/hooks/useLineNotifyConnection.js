import { useForm } from "@inertiajs/react";

/**
 * LINE Notify連携の解除機能を提供するカスタムフック
 *
 * @returns {Object} LINE Notify連携解除に関する関数を含むオブジェクト
 */
export const useLineNotifyConnection = () => {
    // useFormフックからpostメソッドを取得
    const { post } = useForm();

    /**
     * LINE Notify連携解除を処理する関数
     *
     * ユーザーに確認を求めた後、サーバーに連携解除リクエストを送信します。
     *
     * @returns {Promise} 連携解除の結果を含むPromiseオブジェクト
     */
    const handleDisconnect = () => {
        return new Promise((resolve) => {
            // ユーザーに連携解除の確認を求める
            if (confirm("LINE Notifyとの連携を解除しますか？")) {
                // サーバーに連携解除リクエストを送信
                post(
                    route("line-notify.disconnect"),
                    {}, // 送信データ（この場合は空）
                    {
                        preserveState: false, // 状態を保持しない
                        preserveScroll: false, // スクロール位置を保持しない
                        // リクエスト成功時の処理
                        onSuccess: (response) => {
                            alert(response.message); // サーバーからのメッセージをアラート表示
                            resolve(response); // Promiseを解決し、レスポンスを返す
                        },
                        // リクエストエラー時の処理
                        onError: (errors) => {
                            console.error(
                                "Error disconnecting LINE Notify:",
                                errors,
                            );
                            alert(
                                "LINE Notifyとの連携解除中にエラーが発生しました。",
                            );
                            // エラー情報を含むオブジェクトでPromiseを解決
                            resolve({
                                success: false,
                                message: "エラーが発生しました。",
                            });
                        },
                    },
                );
            } else {
                // ユーザーがキャンセルした場合
                resolve({ success: false, message: "キャンセルされました。" });
            }
        });
    };

    // handleDisconnect関数を含むオブジェクトを返す
    return { handleDisconnect };
};
