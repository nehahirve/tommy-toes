import { useState } from 'react'
import Timer from './components/Timer'
import About from './components/About'
import styled from 'styled-components'

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
  const [overlay, toggleOverlay] = useState(false)

  return (
    <Backdrop>
      <Toggle onClick={() => toggleOverlay(!overlay)}>About</Toggle>
      <Timer />
    </Backdrop>
  )
}

export default App
