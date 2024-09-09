import React from "react";

const HeroSection = ({ title, subtitle, imageSrc }) => {
    return (
        <div className="relative h-[500px]">
            <img
                src={imageSrc}
                alt="ヒーロー画像"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-center bg-white bg-opacity-85 p-6 rounded-lg">
                    <h1 className="text-4xl font-bold mb-2">{title}</h1>
                    <h2 className="text-slate-600 text-2xl">{subtitle}</h2>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;