import styled from 'styled-components'
import { createGradient, mapColourToRGBGradient } from '../Utils'

const colours = { raw: 'rgb(136, 157, 2)', ripe: 'rgb(202, 61, 0)' }
const gradientWork = createGradient(colours.ripe, colours.raw)
const gradientBreak = createGradient(colours.raw, colours.ripe)

const Wrapper = styled.div`
  background: ${props => props.ripeness};
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Backdrop = ({ timer, children }) => {
  const { currentTime, timerLength, onABreak } = timer
  const gradient = onABreak ? gradientBreak : gradientWork
  const range = onABreak ? timerLength / 5 : timerLength
  const ripeness =
    gradient[Math.floor(mapColourToRGBGradient(currentTime, range)) - 1]

  return (
    <main>
      <Wrapper ripeness={ripeness}>{children}</Wrapper>
    </main>
  )
}

export default Backdrop
