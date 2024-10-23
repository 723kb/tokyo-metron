import React from "react";

const HeroSection = ({ title, subtitle, imageSrc }) => {
        // 環境変数を使用して画像のフルパスを生成
        const fullImageSrc = `${import.meta.env.VITE_APP_URL}${imageSrc}`;

    return (
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px]">
            <img
                src={fullImageSrc}
                alt="ヒーロー画像"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                <div className="text-center bg-white bg-opacity-85 p-4 sm:p-6 rounded-lg max-w-[90%] sm:max-w-[80%] md:max-w-[70%]">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{title}</h1>
                    <h2 className="text-slate-600 text-lg sm:text-xl md:text-2xl">{subtitle}</h2>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
