import styled from 'styled-components'
import { createGradient, mapToGradient } from '../Utils'

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

const Backdrop = ({ time, children, duration, onABreak }) => {
  const gradient = onABreak ? gradientBreak : gradientWork
  const ripeness = gradient[Math.floor(mapToGradient(time, duration)) - 1]

  return (
    <main>
      <Wrapper ripeness={ripeness}>{children}</Wrapper>
    </main>
  )
}

export default Backdrop
