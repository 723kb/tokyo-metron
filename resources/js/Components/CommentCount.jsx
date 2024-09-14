import React from 'react';

/**
 * コメント数表示コンポーネント
 *
  * @param {Object} props - コンポーネントのプロパティ
 * @param {number} props.comments - 表示するコメント数
 * @returns {JSX.Element} コメント数を表示するアイコンと数字
 */
const CommentCount = ({ comments }) => {
  return (
    <div className="flex items-center space-x-4 mt-4">
      <div className="flex items-center space-x-1 text-gray-600">
        {/* コメントアイコン */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
            clipRule="evenodd"
          />
        </svg>
        {/* コメント数 */}
        <span>{comments}</span>
      </div>
    </div>
  );
};

export default CommentCount;