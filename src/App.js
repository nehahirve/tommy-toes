import { useState, useEffect } from 'react'
import Timer from './components/Timer'
import About from './components/About'
import useTimer from './hooks/useTimer'
import Backdrop from './components/Backdrop'
import styled from 'styled-components'

const DURATION = 10000
const BREAK_DURATION = 5000

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
  }
`

function App() {
  const [appVisible, setAppVisible] = useState(true)
  const [timer, toggleTimer] = useTimer(DURATION, BREAK_DURATION)

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
          console.log(timer)
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
