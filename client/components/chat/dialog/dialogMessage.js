import React from "react"
import PropType from 'prop-types'

const DialogMessage = ({ userEmail, message }) => {
  return (
    <div className="flex items-start mb-4">
      <img src="https://avatars2.githubusercontent.com/u/343407?s=460&v=4" className="w-10 h-10 rounded mr-3" alt="Avatar" />

      <div className="flex flex-col">
        <div className="flex items-end">
          <span className="font-bold text-md mr-2 font-sans">{ userEmail }</span>
          <span className="text-grey text-xs font-light">11:46</span>
        </div>

        <p className="text-md text-grey-darkest pt-1">{ message }</p>
      </div>
    </div>
  )
}

DialogMessage.propTypes = {
  userEmail: PropType.string.isRequired,
  message: PropType.string.isRequired
}

export default DialogMessage
