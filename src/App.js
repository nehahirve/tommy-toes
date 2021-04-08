import { useState, useEffect } from 'react'
import Timer from './components/Timer'
import About from './components/About'
import styled from 'styled-components'

import alarmSFX from './alarm.wav'
const alarm = new Audio(alarmSFX)

const Backdrop = styled.div`
  background: #889d02;
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Toggle = styled.h2`
  position: absolute;
  right: 3rem;
  top: 3rem;
  font-family: 'Agrandir';
  font-weight: 400;
  text-decoration: underline;
`

function App() {
  const [time, setTime] = useState(0.1 * 60 * 1000)
  const [active, setActive] = useState(false)

  const toggleActive = () => {
    setActive(!active)
  }

  useEffect(() => {
    if (active && time === 0) alarm.play()
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
      setTime(0.1 * 60 * 1000)
    } else if (timer) {
      clearInterval(timer)
    }
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [time, active])

  return (
    <Backdrop>
      {/* <Toggle onClick={() => toggleOverlay(!overlay)}>About</Toggle> */}
      <Timer active={active} time={time} toggleActive={toggleActive} />
      {/* <About /> */}
    </Backdrop>
  )
}

export default App
