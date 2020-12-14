import React, { useState } from 'react'

const Home = () => {
  const [counter, setCounterNew] = useState(0)

  return (
    <div>
      <button type="button" onClick={() => setCounterNew(counter + 1)}>
        updateCounter
      </button>
      <div> Hello World Dashboard {counter} </div>
    </div>
  )
}

Home.propTypes = {}

export default Home
