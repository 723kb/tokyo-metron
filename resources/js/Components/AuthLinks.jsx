import React from 'react'
import NavLink from "@/Components/NavLink";
import { useTranslation } from "react-i18next";

const AuthLinks = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center space-x-4">
    <NavLink
    href={route("login")}
    className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
>
    {t("Log in")}
</NavLink>
<NavLink
    href={route("register")}
    className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
>
    {t("Register")}
</NavLink>
</div>
  )
}

export default AuthLinks