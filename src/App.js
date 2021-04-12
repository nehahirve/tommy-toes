import { useState, useEffect } from 'react'

import TimerDisplay from './components/TimerDisplay'
import About from './components/About'
import Backdrop from './components/Backdrop'
import ToggleButton from './components/ToggleButton'

import useTimer from './hooks/useTimer'

const DURATION = 10000
const BREAK_DURATION = 5000

function App() {
  const [appVisible, setAppVisible] = useState(true)
  const [timer, toggleTimer] = useTimer(DURATION, BREAK_DURATION)

  const toggleApp = () => setAppVisible(!appVisible)

  useEffect(() => {
    let timerInterval
    if (timer.active && timer.time === 0) {
      toggleTimer(timer.onABreak ? 'TIMEOUT' : 'STARTBREAK')
    }
    if (timer.active) {
      timerInterval =
        timer.time > 0 &&
        setInterval(() => {
          toggleTimer('COUNTDOWN')
        }, 1000)
    } else clearInterval(timerInterval)
    return () => clearInterval(timerInterval)
  }, [timer.time, timer.active])

  return (
    <Backdrop
      time={timer.time}
      duration={timer.onABreak ? BREAK_DURATION : DURATION}
      onABreak={timer.onABreak}
    >
      <ToggleButton toggled={!appVisible} toggle={toggleApp} />
      {appVisible && <TimerDisplay timer={timer} toggleTimer={toggleTimer} />}
      {!appVisible && <About />}
    </Backdrop>
  )
}

export default App
