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
  &:hover,
  &:focus {
    background: black;
    color: linen;
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
  )
}

export default Timer
