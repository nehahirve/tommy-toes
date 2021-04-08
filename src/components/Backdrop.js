import styled from 'styled-components'
import { createGradient, mapToGradient } from '../Utils'

const colours = { raw: 'rgb(136, 157, 2)', ripe: 'rgb(202, 61, 0)' }
const gradient = createGradient(colours.ripe, colours.raw)

const Wrapper = styled.div`
  background: ${props => props.ripeness};
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='20px' height='20px'%3E%3Ccircle cx='50' cy='50' r='50'/%3E%3C/svg%3E"),
    auto;
`

const Backdrop = ({ time, children, duration }) => {
  const ripeness = gradient[Math.floor(mapToGradient(time, duration)) - 1]

  return <Wrapper ripeness={ripeness}>{children}</Wrapper>
}

export default Backdrop
