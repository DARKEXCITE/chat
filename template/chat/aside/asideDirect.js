import React from "react"

const AsideDirect = () => {
  return (
    <div>
      <div className="px-4 mb-3 font-sans text-purple-200">Direct Messages</div>

      <div className="flex items-center mb-3 px-4">
        <span className="bg-green-600 rounded-full block w-2 h-2 mr-2" />
        <span>Olivia Dunham<br/>
              <i className="text-gray-500 text-sm">(me)</i>
            </span>
      </div>

      <div className="flex items-center mb-3 px-4">
        <span className="bg-green-600 rounded-full block w-2 h-2 mr-2" />
        <span>Adam Bishop</span>
      </div>

      <div className="flex items-center px-4 mb-6">
        <span className="border rounded-full block w-2 h-2 mr-2" />
        <span>killgt</span>
      </div>
    </div>
  )
}

AsideDirect.propTypes = {}

export default React.memo(AsideDirect)
