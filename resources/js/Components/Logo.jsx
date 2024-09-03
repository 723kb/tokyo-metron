import React from 'react'
import { Link } from "@inertiajs/react";


const Logo = () => {
  return (
    <div className="flex  items-center">
    {/* login状態に応じて遷移先を変更 */}
  <Link href="">
      <img
          src="/images/HeaderLogo.png"
          alt="トーキョーめとろんロゴ"
          className="w-[100px] mr-2"
      ></img>
      </Link>
      <h1 className="text-2xl font-bold">トーキョーめとろん</h1>
  </div>
  )
}

export default Logo