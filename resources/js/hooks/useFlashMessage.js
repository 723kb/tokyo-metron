import { useEffect } from "react";

/**
 * フラッシュメッセージを管理するカスタムフック
 *
 * @param {string|null} flashMessage - 表示するフラッシュメッセージ
 * @param {Function} setMessage - メッセージを設定する関数
 */
export const useFlashMessage = (flashMessage, setMessage) => {
    useEffect(() => {
        // フラッシュメッセージが存在する場合のみ処理を実行
        if (flashMessage) {
            // メッセージを設定（タイプは"success"固定）
            setMessage({ text: flashMessage, type: "success" });

            // 3秒後にメッセージをクリアするタイマーを設定
            const timer = setTimeout(() => setMessage(null), 3000);

            // クリーンアップ関数：コンポーネントのアンマウント時やdependenciesが変更された時にタイマーをクリア
            return () => clearTimeout(timer);
        }
    }, [flashMessage]); // flashMessageが変更された時に再実行
};
