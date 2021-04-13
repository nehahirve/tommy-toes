import { useState } from 'react'

import alarmSFX from '../alarm.wav'
import workSFX from '../work.mp3'

const alarm = new Audio(alarmSFX)
const work = new Audio(workSFX)
alarm.volume = 0.6

export default function useTimer(DURATION = 25 * 60 * 1000) {
  const [timer, setTimer] = useState({
    isRunning: false,
    timerLength: DURATION,
    currentTime: DURATION,
    onABreak: false,
    control: 'START'
  })

  const toggleTimer = action => {
    switch (action) {
      case 'INCREMENT':
        setTimer({
          ...timer,
          timerLength: timer.timerLength + 60000,
          currentTime: timer.timerLength + 60000
        })
        break
      case 'DECREMENT':
        setTimer({
          ...timer,
          timerLength: timer.timerLength - 60000,
          currentTime: timer.timerLength - 60000
        })
        break
      case 'START':
        setTimer({ ...timer, isRunning: true, control: 'PAUSE' })
        break
      case 'PAUSE':
        setTimer({ ...timer, isRunning: false, control: 'START' })
        break
      case 'BREAK':
        setTimer({
          ...timer,
          isRunning: true,
          control: 'PAUSE',
          onABreak: true,
          currentTime: timer.timerLength / 5
        })
        break
      case 'RESET':
        setTimer({
          ...timer,
          control: 'START',
          onABreak: false,
          currentTime: timer.timerLength
        })
        break
      case 'COUNTDOWN':
        setTimer({
          ...timer,
          control: 'PAUSE',
          currentTime: timer.currentTime - 1000
        })
        break
      case 'TIMEFORBREAK':
        setTimer({
          ...timer,
          isRunning: false,
          control: 'BREAK'
        })
        alarm.play()
        break
      case 'TIMEFORRESET':
        setTimer({
          ...timer,
          isRunning: false,
          control: 'RESET'
        })
        work.play()
        break
      default:
        return
    }
  }

  return [timer, toggleTimer]
}
