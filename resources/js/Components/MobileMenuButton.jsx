import React from "react";

const MobileMenuButton = ({ isOpen, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            aria-label="toggle menu"
        >
            {/* メニューの開閉状態に応じてアイコンを切り替え */}
            {isOpen ? (
                // メニューが開いている場合は「×」アイコンを表示
                <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            ) : (
                // メニューが閉じている場合は「三」アイコンを表示
                <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            )}
        </button>
    );
};

export default MobileMenuButton;