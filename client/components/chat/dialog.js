import React from 'react'

import DialogHeader from './dialog/dialogHeader'
import DialogBody from './dialog/dialogBody'
import DialogMessageInput from './dialog/dialogMessageInput'

const Dialog = () => {
  return (
    <div className="w-full flex flex-col h-screen">
      <DialogHeader />
      <DialogBody />
      <DialogMessageInput />
    </div>
  )
}

export default Dialog
