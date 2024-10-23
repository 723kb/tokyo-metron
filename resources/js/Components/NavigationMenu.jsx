import React from "react";
import NavLink from "./NavLink";

const NavigationMenu = () => {
    return (
        <div className="flex items-center space-x-4">
            <nav>
                <NavLink href="#">使い方</NavLink>
                <NavLink href="#">お問い合わせ</NavLink>
            </nav>
        </div>
    );
};

export default NavigationMenu;