import React from 'react'

const AsideChannels = () => {
  return (
    <div>
      <div className="px-4 mb-2 font-sans text-purple-200">Channels</div>
      <div className="bg-teal-500 mb-6 py-1 px-4 text-white">
        <span className="pr-1 text-grey-light">#</span> general
      </div>
    </div>
  )
}

AsideChannels.propTypes = {}

export default React.memo(AsideChannels)
