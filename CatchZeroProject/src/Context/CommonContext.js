
import React, { useState, useEffect } from 'react';

const CommonContext = React.createContext();

const CommonProvider = (props) => {

  const [LastPlayedScoreAndNumbersHistory, setLastPlayedScoreAndNumbersHistory] = useState(null)

  return (
    <CommonContext.Provider
      value={{
        LastPlayedScoreAndNumbersHistory,
        setLastPlayedScoreAndNumbersHistory
      }}
    >
      {props.children}
    </CommonContext.Provider>
  )
}

export { CommonProvider, CommonContext };