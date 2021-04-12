import styled from 'styled-components'

const Button = styled.button`
  position: absolute;
  background: none;
  right: 3rem;
  top: 3rem;
  font-family: 'Agrandir';
  font-weight: 400;
  font-size: 1.5rem;
  background-image: linear-gradient(120deg, black, black);
  background-repeat: no-repeat;
  background-position: 0 88%;
  background-size: 100% 0.1rem;
  transition: background-size 0.25s ease-in;
  &:hover,
  &:focus {
    background-size: 100% 70%;
    color: linen;
  }
`

const ToggleButton = ({ toggled, toggle }) => {
  return (
    <Button
      onClick={e => {
        e.target.blur()
        toggle()
      }}
    >
      {toggled ? 'X' : 'About'}
    </Button>
  )
}

export default ToggleButton
