import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

const Main = () => {
  return (
    <Authenticated>
      <Head title="メイン" />
      Mainページ
      </Authenticated>
  )
}

export default Main