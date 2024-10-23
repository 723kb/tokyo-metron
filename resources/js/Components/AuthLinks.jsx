import React from 'react'
import { useTranslation } from "react-i18next";
import ActionLink from './ActionLink';

const AuthLinks = ({ spacing = "space-x-20" }) => {  // コンポーネントによって要素間の余白を調整できるように
  const { t } = useTranslation();
  const buttonClass = "px-4 py-2 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";

  return (
    <div className={`flex items-center ${spacing} my-4`}>
      <ActionLink
        href={route("login")} 
        className={`${buttonClass} bg-blue-500 hover:bg-blue-700 focus:ring-blue-500`}
      >
        <span className="block w-full">{t("Log in")}</span>
      </ActionLink>
      <ActionLink 
        href={route("register")} 
        className={`${buttonClass} bg-green-500 hover:bg-green-700 focus:ring-green-500`}
      >
        <span className="block w-full">{t("Register")}</span>
      </ActionLink>
    </div>
  )
}

export default AuthLinks