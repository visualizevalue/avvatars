import { Pattern } from './pattern'

export interface SVGOptions {
  size?: number
  foreground?: string
  background?: string
  padding?: number
}

/**
 * Render a pattern as an SVG string
 */
export function renderSVG(pattern: Pattern, options: SVGOptions = {}): string {
  const {
    size = 100,
    foreground = '#000000',
    background = '#ffffff',
    padding = 0.1,
  } = options

  const { cells, gridSize } = pattern
  const paddingPx = size * padding
  const innerSize = size - paddingPx * 2
  const cellSize = innerSize / gridSize

  let paths = ''

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (cells[y][x]) {
        const px = paddingPx + x * cellSize
        const py = paddingPx + y * cellSize
        paths += `<rect x="${px}" y="${py}" width="${cellSize}" height="${cellSize}" fill="${foreground}"/>`
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
<rect width="${size}" height="${size}" fill="${background}"/>
${paths}
</svg>`
}

/**
 * Render pattern as a minimal path-based SVG (smaller file size)
 */
export function renderSVGPath(pattern: Pattern, options: SVGOptions = {}): string {
  const {
    size = 100,
    foreground = '#000000',
    background = '#ffffff',
    padding = 0.1,
  } = options

  const { cells, gridSize } = pattern
  const paddingPx = size * padding
  const innerSize = size - paddingPx * 2
  const cellSize = innerSize / gridSize

  // Build a single path for all filled cells
  let path = ''

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (cells[y][x]) {
        const px = paddingPx + x * cellSize
        const py = paddingPx + y * cellSize
        path += `M${px},${py}h${cellSize}v${cellSize}h-${cellSize}z`
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><rect width="${size}" height="${size}" fill="${background}"/><path d="${path}" fill="${foreground}"/></svg>`
}
