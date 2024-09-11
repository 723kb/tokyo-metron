import { Head } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import StatusDisplay from "@/Components/StatusDisplay";
import CommentCount from "@/Components/CommentCount";
import LineHeroSection from "@/Components/LineHeroSection";

/**
 * 路線の運行状況一覧を表示するコンポーネント
 *
 * @param {Object} props
 * @param {Object} props.line - 路線情報
 * @param {Array} props.statusUpdates - 運行状況の更新履歴
 */
const LinePostList = ({ line, statusUpdates }) => {
    // 路線情報が存在しない場合のエラー表示
    if (!line) return <div>路線情報が見つかりません。</div>;

    return (
        <Authenticated>
            <Head title={`${line.name} の運行状況一覧`} />

            {/* ヒーローセクション */}
            <LineHeroSection lineName={line.name} lineColor={line.color_code} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {statusUpdates.map((update) => (
                            <div
                                key={update.id}
                                className="mb-4 p-4 border rounded-md bg-slate-100"
                            >
                                <p className="text-sm text-gray-500 mb-2">
                                    {/* 更新日時 */}
                                    {new Date(
                                        update.created_at,
                                    ).toLocaleString()}
                                </p>
                                {/* 運行状況ステータス */}
                                <StatusDisplay status={update.status} />
                                {/* 運行状況詳細 */}
                                <p>{update.content}</p>
                                <CommentCount />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default LinePostList;