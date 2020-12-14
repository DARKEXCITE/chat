import React from "react"

import Aside from "./chat/aside"
import Dialog from "./chat/dialog"

const Chat = () => {
  return (
    <div className="w-screen h-screen">
      <div className="flex">
        <Aside />
        <Dialog />
      </div>
    </div>
  );
};

Chat.propTypes = {}

export default React.memo(Chat)
