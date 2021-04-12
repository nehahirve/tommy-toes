import { useState } from 'react'
import styled from 'styled-components'
import { msToHuman } from '../Utils'
import 'animate.css'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Triangle = styled.button`
  width: 40%;
  background: none;
  padding: 3rem;
  fill: none;
  stroke: black;
  stroke-width: 10;
  stroke-alignment: inner;
  stroke-linecap: round;
  stroke-linejoin: mitier;
  &:focus svg,
  svg:hover {
    fill: black;
  }
`

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

const TimerDisplay = ({ timer, toggleTimer }) => {
  const [label, setLabel] = useState(null)
  const { time, control, onABreak, duration } = timer

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

  const incrementTime = e => {
    e.target.blur()
    toggleTimer('INCREMENT')
  }
  const decrementTime = e => {
    e.target.blur()
    toggleTimer('DECREMENT')
  }

  return (
    <Wrapper>
      {duration === time && (
        <Triangle onClick={incrementTime}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='-10 0 120 120'>
            <polygon points='50 15, 100 100, 0 100' />
          </svg>
        </Triangle>
      )}
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
      {duration === time && (
        <Triangle onClick={decrementTime}>
          <svg
            style={{ transform: 'rotate(180deg)' }}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='-10 0 120 120'
          >
            <polygon points='50 15, 100 100, 0 100' />
          </svg>
        </Triangle>
      )}
    </Wrapper>
  )
}

export default TimerDisplay
