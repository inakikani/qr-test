import React, { useEffect, useState } from 'react'
import rootClasses from '../App.module.css'
import classes  from './Countdown.module.css'
import {fromEvent} from 'rxjs'
import {throttleTime, map} from 'rxjs/operators'

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

    const devOrient = useDeviceOrientation()

    const [orientStyle, setOrientStyle] = useState({
        clipPath: `circle(30vmin)`
    })
    useEffect( () => {
        if(devOrient){
            const _scaledDO = scaleDeviceOrientation(
                devOrient,
                {maxA: 40, maxB: 40, maxG: 40}
            )
            setOrientStyle({
                clipPath: `circle(40vmin at ${50-_scaledDO.gamma}% ${50-_scaledDO.beta}%)`
            })
        }

        return ()=>{}
    }, [devOrient])
    

    return (
        <div className={`${rootClasses.root} ${classes.background}`}>
            <div className={classes.int}>
                {val}
            </div>
            <div className={classes.tilted}
                style={orientStyle}
            >
            </div>
        </div>
    )
}

function useDeviceOrientation(){
    
    const [_devOrient, setDevOrient] = useState()
    const [initial, setInitial] = useState()

    useEffect(() => {

        function handleDeviceOrientation(e){
            let {absolute, alpha, beta, gamma} = e
            if(!initial){
                setInitial({absolute, alpha, beta, gamma})
            } else {
                setDevOrient({
                    absolute,
                    alpha: alpha - initial.alpha,
                    beta: beta - initial.beta,
                    gamma: gamma - initial.gamma
                })
            }
        }
        let sub = fromEvent(window, 'deviceorientation')
            .pipe(
                map(({absolute, alpha, beta, gamma}) => ({absolute, alpha, beta, gamma})),
                throttleTime(50)
            )
            .subscribe({
                next: handleDeviceOrientation
            })

        return () => {
            sub.unsubscribe()
        }
    }, [initial])

    return _devOrient
}

function scaleDeviceOrientation(deviceOrientation, options={maxA: 360, maxB: 180, maxG: 90}){
    if(!deviceOrientation) return 
    const {alpha=0, beta=0, gamma=0} = deviceOrientation
    const {maxA, maxB, maxG} = options

    const _unscaledAbsMaxA = 360
    const _unscaledAbsMaxB = 180
    const _unscaledAbsMaxG = 90

    let _scaledAlpha =  maxA * alpha / _unscaledAbsMaxA
    let _scaledBeta =  maxB * beta / _unscaledAbsMaxB 
    let _scaledGamma =  maxG * gamma / _unscaledAbsMaxG 

    return {
        alpha: _scaledAlpha,
        beta: _scaledBeta,
        gamma: _scaledGamma
    }
}