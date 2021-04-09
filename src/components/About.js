import styled from 'styled-components'

const Title = styled.a`
  text-decoration: none;
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

const Wrapper = styled.div`
  max-width: 30rem;
`

const About = () => {
  return (
    <Wrapper>
      <h1>
        <Title href='https://github.com/nehahirve/tommy-toes'>Tommy Toe</Title>
      </h1>
      <p>
        is a minimalist pomodoro timer. It works. No fancy features here,
        because I had more important work to do. Just like you do.
      </p>
    </Wrapper>
  )
}

export default About
