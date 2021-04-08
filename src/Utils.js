const msToHuman = ms => {
  const minutes = Math.floor((ms / 1000 / 60) % 60)
  const seconds = Math.floor((ms / 1000) % 60)
  return [
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0')
  ].join(' : ')
}

export { msToHuman }

function rgbStringToRgbObject(c1) {
  c1 = c1.slice(4, -1).split(',')
  return {
    r: +c1[0],
    g: +c1[1],
    b: +c1[2]
  }
}

export function createGradient(c1, c2) {
  c1 = rgbStringToRgbObject(c1)
  c2 = rgbStringToRgbObject(c2)
  let gradient = []
  for (let i = 0; i < 255; i++) {
    let r = c1.r + (i * (c2.r - c1.r)) / 255
    let g = c1.g + (i * (c2.g - c1.g)) / 255
    let b = c1.b + (i * (c2.b - c1.b)) / 255
    gradient.push({ r, g, b })
  }
  return gradient.map(color => {
    return `rgb(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(
      color.b
    )})`
  })
}

export function mapToGradient(input, ms) {
  const outputStart = 1
  const outputEnd = 255
  const inputStart = 0
  const inputEnd = ms
  const slope = (outputEnd - outputStart) / (inputEnd - inputStart)
  return outputStart + slope * (input - inputStart)
}