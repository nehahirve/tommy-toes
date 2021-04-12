import { useState } from 'react'

import alarmSFX from '../alarm.wav'
import workSFX from '../work.mp3'

const alarm = new Audio(alarmSFX)
const work = new Audio(workSFX)
alarm.volume = 0.6

export default function useTimer(
  DURATION = 25 * 60000,
  BREAK_DURATION = 5 * 60000
) {
  const [timer, setTimer] = useState({
    active: false,
    time: DURATION,
    onABreak: false,
    control: 'START'
  })

  const toggleTimer = action => {
    switch (action) {
      case 'START':
        setTimer({ ...timer, active: true, control: 'PAUSE' })
        break
      case 'PAUSE':
        setTimer({ ...timer, active: false, control: 'START' })
        break
      case 'BREAK':
        setTimer({
          ...timer,
          active: true,
          control: 'PAUSE',
          onABreak: true,
          time: BREAK_DURATION
        })
        break
      case 'RESET':
        setTimer({
          ...timer,
          control: 'START',
          onABreak: false,
          time: DURATION
        })
        break
      case 'COUNTDOWN':
        setTimer({
          ...timer,
          control: 'PAUSE',
          time: timer.time - 1000
        })
        break
      case 'STARTBREAK':
        setTimer({
          ...timer,
          active: false,
          control: 'BREAK'
        })
        alarm.play()
        break
      case 'TIMEOUT':
        setTimer({
          ...timer,
          active: false,
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
