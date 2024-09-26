import React from "react";

/**
 * 路線別ヒーローセクションコンポーネント
 *
 * 路線名と路線カラーを使用して、路線別投稿一覧画面の上部に表示するヒーローセクションを生成。
 *
 * @param {Object} props
 * @param {string} props.lineName - 表示する路線名
 * @param {string} props.lineColor - 背景色として使用する路線カラー
 * @returns {JSX.Element} 路線別ヒーローセクション
 */
const LineHeroSection = ({ lineName, lineColor }) => {
    return (
        <div
            className="relative h-[200px]"
            style={{ backgroundColor: lineColor }}
        >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-1/2 text-center bg-white bg-opacity-85 p-6 rounded-lg">
                    <h1 className="text-4xl font-bold mb-2">{lineName}</h1>
                </div>
            </div>
        </div>
    );
};

export default LineHeroSection;