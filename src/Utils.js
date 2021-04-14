const msToTimeString = ms => {
  const minutes = Math.floor((ms / 1000 / 60) % 60)
  const seconds = Math.floor((ms / 1000) % 60)
  return [
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0')
  ].join(' : ')
}

const createGradient = (c1, c2) => {
  c1 = rgbStringToRgbObject(c1)
  c2 = rgbStringToRgbObject(c2)
  const gradient = []
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

const mapColourToRGBGradient = (input, range) => {
  const outputStart = 1
  const outputEnd = 255
  const inputStart = 0
  const inputEnd = range
  const slope = (outputEnd - outputStart) / (inputEnd - inputStart)
  return outputStart + slope * (input - inputStart)
}

function rgbStringToRgbObject(rgbString) {
  rgbString = rgbString.slice(4, -1).split(',')
  return {
    r: +rgbString[0],
    g: +rgbString[1],
    b: +rgbString[2]
  }
}

export { msToTimeString, mapColourToRGBGradient, createGradient }
