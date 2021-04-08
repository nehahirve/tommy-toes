import { useState } from 'react'
import styled from 'styled-components'
import { msToHuman } from '../Utils'
import 'animate.css'

const Display = styled.button`
  width: 25rem;
  font-size: 6rem;
  border: 6px solid black;
  border-radius: 999px;
  color: ${props => (props.onABreak ? 'linen' : 'black')};
  background: ${props => (props.onABreak ? 'black' : 'none')};
  padding-top: 0.25rem;
  cursor: pointer;
  &:hover,
  &:focus {
    background: black;
    color: linen;
    cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='20px' height='20px'%3E%3Ccircle cx='50' cy='50' r='50' fill='linen'/%3E%3C/svg%3E"),
      auto;
  }
`

const Timer = ({ timer, toggleTimer }) => {
  const [label, setLabel] = useState(null)
  const { time, control, onABreak } = timer

  const triggerHoverState = e => {
    e.target.focus()
    setLabel(control)
  }
  const removeHoverState = e => {
    e.target.blur()
    setLabel(null)
  }

  const handleClick = e => {
    e.target.blur()
    toggleTimer(control)
  }

  return (
    <main>
      <Display
        className={
          time === 0
            ? 'animate__animated animate__infinite animate__wobble'
            : null
        }
        onMouseOver={triggerHoverState}
        onFocus={triggerHoverState}
        onMouseLeave={removeHoverState}
        onBlur={removeHoverState}
        onClick={handleClick}
        onABreak={onABreak}
      >
        {label || msToHuman(time)}
      </Display>
    </main>
  )
}

export default Timer
