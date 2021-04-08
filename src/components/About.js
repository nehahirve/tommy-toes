import styled from 'styled-components'

const Title = styled.a`
  text-decoration: none;
  cursor: pointer;
  background-image: linear-gradient(120deg, black, black);
  background-repeat: no-repeat;
  background-position: 0 88%;
  background-size: 100% 0.1rem;
  transition: background-size 0.25s ease-in;

  &:hover,
  &:focus {
    cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='20px' height='20px'%3E%3Ccircle cx='50' cy='50' r='50' fill='linen'/%3E%3C/svg%3E"),
      auto;
    background-size: 100% 70%;
    color: linen;
  }
`

const About = () => {
  return (
    <main>
      <h1>
        <Title href='https://github.com/nehahirve/tommy-toes'>Tommy Toe</Title>
      </h1>
      <p>
        is a minimalist pomodoro timer. It works. No fancy features here,
        because I had more important work to do. Just like you do.
      </p>
    </main>
  )
}

export default About
