import React from 'react'

import AsideHeader from './aside/asideHeader'
import AsideChannels from './aside/asideChannels'
import AsideDirect from './aside/asideDirect'
import AsideApp from './aside/asideApp'

const Aside = () => {
  return (
    <aside className="bg-purple-800 text-purple-lighter w-1/5 pb-6 hidden md:block text-white">
      <AsideHeader />
      <AsideChannels />
      <AsideDirect />
      <AsideApp />
    </aside>
  )
}

Aside.propTypes = {}

export default React.memo(Aside)
