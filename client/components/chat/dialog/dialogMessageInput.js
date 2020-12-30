import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { updateMessage, sendMessage } from '../../../redux/reducers/chat'

const DialogMessageInput = () => {
  const message = useSelector((s) => s.chat.message)
  const dispatch = useDispatch()

  return (
    <div className="flex m-6 rounded-lg border-2 border-gray-500 overflow-hidden mt-auto">
      <span className="text-3xl text-gray-700 px-3 border-r-2 border-gray-500">+</span>

      <input
        type="text"
        className="w-full px-4 focus:outline-none"
        placeholder="Message to #general"
        value={message}
        onChange={(e) => {
          dispatch(updateMessage(e.target.value))
        }}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            dispatch(sendMessage())
            e.target.value = ''
          }
        }}
      />
    </div>
  )
}

export default DialogMessageInput
