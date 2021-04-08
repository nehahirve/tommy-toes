import { useState, useEffect } from 'react'
import Timer from './components/Timer'
import About from './components/About'
import Backdrop from './components/Backdrop'
import styled from 'styled-components'

import alarmSFX from './alarm.wav'
import workSFX from './work.mp3'

const alarm = new Audio(alarmSFX)
const work = new Audio(workSFX)
alarm.volume = 0.6

const DURATION = 1000 * 60 * 25
const BREAK_DURATION = 1000 * 5 * 60

const Toggle = styled.button`
  position: absolute;
  background: none;
  right: 3rem;
  top: 3rem;
  font-family: 'Agrandir';
  font-weight: 400;
  font-size: 1.5rem;
  background-image: linear-gradient(120deg, black, black);
  background-repeat: no-repeat;
  background-position: 0 88%;
  background-size: 100% 0.1rem;
  transition: background-size 0.25s ease-in;
  &:hover,
  &:focus {
    background-size: 100% 70%;
    color: linen;
    cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='20px' height='20px'%3E%3Ccircle cx='50' cy='50' r='50' fill='linen'/%3E%3C/svg%3E"),
      auto;
  }
`

function App() {
  const [appVisible, setAppVisible] = useState(true)

  const [timer, setTimer] = useState({
    active: false,
    time: DURATION,
    onABreak: false,
    control: 'START'
  })

  const soundAlarm = () => {
    if (!timer.onABreak) {
      setTimer({
        ...timer,
        active: false,
        control: 'BREAK'
      })
      alarm.play()
    } else {
      setTimer({
        ...timer,
        active: false,
        control: 'RESET'
      })
      work.play()
    }
  }

  const toggleTimer = control => {
    switch (control) {
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
      default:
        return
    }
  }

  useEffect(() => {
    let timerInterval
    if (timer.active && timer.time === 0) soundAlarm()
    if (timer.active) {
      timerInterval =
        timer.time > 0 &&
        setInterval(() => setTimer({ ...timer, time: timer.time - 1000 }), 1000)
    } else clearInterval(timerInterval)
    return () => clearInterval(timerInterval)
  }, [timer.time, timer.active])

  return (
    <Backdrop onABreak={timer.onABreak} time={timer.time} duration={DURATION}>
      <Toggle
        onClick={e => {
          e.target.blur()
          setAppVisible(!appVisible)
        }}
      >
        {appVisible ? 'About' : 'X'}
      </Toggle>
      {appVisible && <Timer timer={timer} toggleTimer={toggleTimer} />}
      {!appVisible && <About />}
    </Backdrop>
  )
}

export default App
