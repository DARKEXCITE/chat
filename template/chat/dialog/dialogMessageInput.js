import React from "react"

const DialogMessageInput = () => {
  return (
    <div className="flex m-6 rounded-lg border-2 border-gray-500 overflow-hidden mt-auto">
        <span className="text-3xl text-gray-700 px-3 border-r-2 border-gray-500">+</span>
        <input type="text" className="w-full px-4 focus:outline-none" placeholder="Message to #general" />
      </div>
  )
}

DialogMessageInput.propTypes = {}

export default React.memo(DialogMessageInput)
