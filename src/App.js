import { useState, useEffect } from 'react'
import Timer from './components/Timer'
import About from './components/About'
import useTimer, { DURATION } from './hooks/useTimer'
import Backdrop from './components/Backdrop'
import styled from 'styled-components'

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
  const [timer, toggleTimer] = useTimer()

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
