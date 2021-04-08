import { useState, useEffect } from 'react'
import Timer from './components/Timer'
import About from './components/About'
import Backdrop from './components/Backdrop'
import styled from 'styled-components'

import alarmSFX from './alarm.wav'
const alarm = new Audio(alarmSFX)
alarm.volume = 0.6
const duration = 1000 * 1500

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
    color: white;
    cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='20px' height='20px'%3E%3Ccircle cx='50' cy='50' r='50' fill='white'/%3E%3C/svg%3E"),
      auto;
  }
`

function App() {
  const [time, setTime] = useState(duration)
  const [active, setActive] = useState(false)
  const [appVisible, setAppVisible] = useState(true)

  const toggleActive = e => {
    e.target.blur()
    setActive(!active)
  }

  useEffect(() => {
    if (active && time === 0) alarm.play({ volume: 0.25 })
    let timer
    if (active) {
      timer =
        time > 0 &&
        setInterval(() => {
          setTime(time - 1000)
          console.log('countdown')
        }, 1000)
    } else if (time === 0) {
      setActive(false)
      setTime(duration)
    } else if (timer) {
      clearInterval(timer)
    }
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [time, active])

  return (
    <Backdrop time={time} duration={duration}>
      <Toggle onClick={() => setAppVisible(!appVisible)}>
        {appVisible ? 'About' : 'X'}
      </Toggle>
      {appVisible && (
        <Timer active={active} time={time} toggleActive={toggleActive} />
      )}
      {!appVisible && <About />}
    </Backdrop>
  )
}

export default App
