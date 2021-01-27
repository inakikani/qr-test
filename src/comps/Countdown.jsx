import React, { useEffect, useState } from 'react'
import rootClasses from '../App.module.css'
import classes  from './Countdown.module.css'

export default function Countdown() {

    const [val, setVal] = useState(10)

    useEffect(() => {
        let _intId = setInterval(() => {
            setVal(prev => {
                if(prev === 0) {
                    // clearInterval(_intId)
                    return 10
                }
                return prev-1
            })
        }, 1000)
        return () => {
            clearInterval(_intId)
        }
    }, [])

    return (
        <div className={`${rootClasses.root} ${classes.background}`}>
            <div className={classes.int}>
                {val}
            </div>
        </div>
    )
}
