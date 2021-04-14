import { useState, useEffect } from 'react'

import TimerDisplay from './components/TimerDisplay'
import AboutPage from './components/AboutPage'
import Backdrop from './components/Backdrop'
import ToggleButton from './components/ToggleButton'

import useTimer from './hooks/useTimer'

function App() {
  const [appVisible, setAppVisible] = useState(true)
  const [timer, toggleTimer] = useTimer()

  const toggleApp = () => setAppVisible(!appVisible)

  useEffect(() => {
    let timerInterval
    if (timer.isRunning && timer.currentTime === 0) {
      toggleTimer(timer.onABreak ? 'TIMEFORRESET' : 'TIMEFORBREAK')
    }
    if (timer.isRunning) {
      timerInterval =
        timer.currentTime > 0 &&
        setTimeout(() => {
          toggleTimer('COUNTDOWN')
        }, 10)
    } else clearTimeout(timerInterval)
    return () => clearTimeout(timerInterval)
  }, [timer.currentTime, timer.isRunning])

  return (
    <Backdrop timer={timer}>
      <ToggleButton toggled={!appVisible} toggle={toggleApp} />
      {appVisible && <TimerDisplay timer={timer} toggleTimer={toggleTimer} />}
      {!appVisible && <AboutPage />}
    </Backdrop>
  )
}

export default App
