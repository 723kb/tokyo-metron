import { Head } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import StatusDisplay from "@/Components/StatusDisplay";
import LineHeroSection from "@/Components/LineHeroSection";
import ActionLink from "@/Components/ActionLink";
import CommentCount from "@/Components/CommentCount";

/**
 * 路線の特定の運行状況詳細を表示するコンポーネント
 *
 * @param {Object} props
 * @param {Object} props.line - 路線情報
 * @param {Object} props.statusUpdate - 特定の運行状況更新
 * @param {Array} props.comments - 運行状況に対するコメント
 */
const LinePostDetail = ({ line, statusUpdate, comments }) => {
    // 必要なデータが存在しない場合のエラー表示
    if (!line || !statusUpdate) return <div>情報が見つかりません。</div>;

    return (
        <Authenticated>
            <Head title={`${line.name} の運行状況詳細`} />

            {/* ヒーローセクション */}
            <LineHeroSection lineName={line.name} lineColor={line.color_code} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {/* 運行状況の詳細情報 */}
                        <div className="mb-6">
                            <p className="text-sm text-gray-500 mb-2">
                                {new Date(
                                    statusUpdate.created_at,
                                ).toLocaleString()}
                            </p>
                            <StatusDisplay status={statusUpdate.status} />
                            <p className="mt-2">{statusUpdate.content}</p>
                            <div className="flex justify-between items-center mt-4">
                                {/* コメント追加リンク */}
                                <ActionLink href="#" className="text-blue-600">
                                    コメントする
                                </ActionLink>
                                {/* コメント数表示 */}
                                <CommentCount comments={comments.length} />
                            </div>
                        </div>

                        {/* コメントセクション */}
                        <h2 className="text-xl font-bold mb-4">コメント</h2>
                        {comments && comments.length > 0 ? (
                            comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="mb-4 p-4 bg-gray-100 rounded"
                                >
                                    {/* コメント投稿者名 */}
                                    <p className="font-semibold">
                                        {comment.user.name}
                                    </p>
                                    {/* コメント内容 */}
                                    <p>{comment.content}</p>
                                    {/* コメント投稿日時 */}
                                    <p className="text-sm text-gray-500 mt-2">
                                        {new Date(
                                            comment.created_at,
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>コメントはまだありません。</p>
                        )}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default LinePostDetail;