
import React, { useState, useEffect } from 'react';

const CommonContext = React.createContext();

const CommonProvider = (props) => {

  const [LastPlayedScoreAndNumbersHistory, setLastPlayedScoreAndNumbersHistory] = useState(null)


//   useEffect(() => {
//     console.log("useEffect called");
//     // setFoodFromUrl();
//   })

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