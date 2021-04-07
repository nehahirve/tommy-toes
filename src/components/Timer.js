import styled from 'styled-components'

const Display = styled.button`
  width: 25rem;
  font-size: 6rem;
  border: 6px solid black;
  border-radius: 999px;
  background: none;
  padding-top: 0.25rem;
  cursor: pointer;
  &:hover {
    background: black;
    color: white;
  }
`

const Timer = () => {
  return <Display>25 : 00</Display>
}

export default Timer
