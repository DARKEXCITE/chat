import React from "react";

const DialogMessage = () => {
  return (
    <div className="flex items-start mb-4">
              <img src="https://avatars2.githubusercontent.com/u/343407?s=460&v=4" className="w-10 h-10 rounded mr-3" alt="" />
              <div className="flex flex-col">
                <div className="flex items-end">
                  <span className="font-bold text-md mr-2 font-sans">killgt</span>
                  <span className="text-grey text-xs font-light">11:46</span>
                </div>
                <p className="text-md text-grey-darkest pt-1">The slack from the other side.</p>
              </div>
            </div>
  );
};

DialogMessage.propTypes = {}

export default React.memo(DialogMessage)
