import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { msToHuman } from '../Utils'
import 'animate.css'

const Display = styled.button`
  width: 25rem;
  font-size: 6rem;
  border: 6px solid black;
  border-radius: 999px;
  color: ${props => (props.onABreak ? 'white' : 'black')};
  background: ${props => (props.onABreak ? 'black' : 'none')};
  padding-top: 0.25rem;
  cursor: pointer;
  &:hover,
  &:focus {
    background: black;
    color: white;
    cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='20px' height='20px'%3E%3Ccircle cx='50' cy='50' r='50' fill='white'/%3E%3C/svg%3E"),
      auto;
  }
`

const Timer = ({ time, active, toggleActive, onABreak }) => {
  const [buttonText, setButtonText] = useState(null)

  const handleHover = () => {
    if (active) setButtonText('PAUSE')
    else setButtonText('START')
    if (time === 0 && onABreak) setButtonText('RESET')
    if (time === 0 && !onABreak) setButtonText('BREAK')
  }

  return (
    <main>
      <Display
        className={
          time === 0
            ? 'animate__animated animate__infinite animate__wobble'
            : null
        }
        onMouseEnter={handleHover}
        onFocus={handleHover}
        onMouseLeave={e => {
          e.target.blur()
          setButtonText(null)
        }}
        onBlur={() => {
          console.log('hey')
          setButtonText(null)
        }}
        onClick={e => toggleActive(e)}
        onABreak={onABreak}
      >
        {buttonText || msToHuman(time)}
      </Display>
    </main>
  )
}

export default Timer
