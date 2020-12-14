import React from "react";

const DialogHeader = () => {
  return (
    <div className="border-b flex px-6 py-2 items-center">
        <div className="flex flex-col">
          <h3 className="text-gray-700 text-2xl font-black">#general</h3>
          <div className="text-gray-500 text-sm">
            Chit-chattin&apos; about ugly HTML and mixing of concerns.
          </div>
        </div>
        <div className="ml-auto hidden md:block">
          <input type="search" placeholder="Search" className="border border-gray-600 rounded-lg p-2 focus:outline-none" />
        </div>
      </div>
  )
}

DialogHeader.propTypes = {}

export default React.memo(DialogHeader)
