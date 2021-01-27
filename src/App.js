import React, {useEffect, useState} from 'react'
import classes from './App.module.css'
import Countdown from './comps/Countdown'

function App() {
  // const [pageIdx, setPageIdx] = useState(0)
  // useEffect(() => {
  //   setPageIdx(Math.random() * 3 >> 0)
  //   return () => {}
  // }, [])
  return (
    <div className={classes.root}>
      <div>
        <Countdown />
      </div>
    </div>
  );
}

export default App;