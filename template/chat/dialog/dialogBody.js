import React from "react"
import DialogMessage from "./dialogMessage";

const DialogBody = () => {
  return (
    <div className="px-6 py-4 flex-1">
        <DialogMessage />
        <DialogMessage />
        <DialogMessage />
      </div>
  )
}

DialogBody.propTypes = {}

export default React.memo(DialogBody)
