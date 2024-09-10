import React from 'react'
import { useTranslation } from "react-i18next";
import { Link } from '@inertiajs/react';

const AuthLinks = () => {
  const { t } = useTranslation();
  const buttonClass = "px-4 py-2 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";

  return (
    <div className="flex items-center space-x-4">
      <Link 
        href={route("login")} 
        className={`${buttonClass} bg-blue-600 hover:bg-blue-700 focus:ring-blue-500`}
      >
        {t("Log in")}
      </Link>
      <Link 
        href={route("register")} 
        className={`${buttonClass} bg-green-600 hover:bg-green-700 focus:ring-green-500`}
      >
        {t("Register")}
      </Link>
    </div>
  )
}

export default AuthLinks