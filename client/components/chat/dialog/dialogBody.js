import React from 'react'
import { useSelector } from 'react-redux'

import DialogMessage from './dialogMessage'

const DialogBody = () => {
  const messages = useSelector((s) => s.chat.messages)

  return (
    <div className="px-6 py-4 flex-1">
      {messages.map((message) => {
        return (
          <DialogMessage
            key={message.message}
            userEmail={message.email}
            message={message.message}
          />
        )
      })}
    </div>
  )
}

export default DialogBody
