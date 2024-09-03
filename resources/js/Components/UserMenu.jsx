import React from "react";
import Dropdown from "./Dropdown";

const UserMenu = ({ user }) => {
    return (
        <Dropdown>
            {/* ドロップダウンのトリガー部分 */}
            <Dropdown.Trigger>
                <span className="inline-flex rounded-md">
                    <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                    >
                        {/* ユーザー名を表示 */}
                        {user.name}

                        {/* ドロップダウンアイコン（下向き矢印） */}
                        <svg
                            className="ml-2 -mr-0.5 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </span>
            </Dropdown.Trigger>

            {/* ドロップダウンの内容 */}
            <Dropdown.Content>
                {/* マイページへのリンク とりあえず仮リンク*/}
                <Dropdown.Link href={route("profile.edit")}>
                    マイページ
                </Dropdown.Link>
                {/* ログアウトリンク */}
                <Dropdown.Link href={route("logout")} method="post" as="button">
                    ログアウト
                </Dropdown.Link>
            </Dropdown.Content>
        </Dropdown>
    );
};

export default UserMenu;