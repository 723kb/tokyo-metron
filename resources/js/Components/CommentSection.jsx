import React from 'react'
import CommentItem from './CommentItem';

/**
 * コメントセクションを表示するコンポーネント
 *
 * @param {Object} props
 * @param {Array} props.comments - 表示するコメントの配列
 * @param {number} props.currentUserId - 現在ログインしているユーザーのID
 * @param {Function} props.onCommentDeleted - コメント削除時のコールバック関数
 * @returns {JSX.Element} コメントセクション
 */
const CommentSection = ({ comments, currentUserId, onCommentDeleted }) => (
  <>
    <h2 className="text-xl font-bold my-4">コメント</h2>
    {/* コメントがあればCommentItemを表示 */}
    {comments.length > 0 ? (
      comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUserId={currentUserId}
          onCommentDeleted={onCommentDeleted}
        />
      ))
    ) : (
      <p>コメントはまだありません。</p>
    )}
  </>
);

export default CommentSection