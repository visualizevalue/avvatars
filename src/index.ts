import { generatePattern, PatternOptions, PatternType } from './pattern'
import { renderSVG, renderSVGPath, SVGOptions } from './svg'

export interface AvvatarOptions {
  /** Seed string (e.g., Ethereum address) */
  seed?: string
  /** Output size in pixels */
  size?: number
  /** Grid resolution (default: 5) */
  gridSize?: number
  /** Foreground color (default: #000000) */
  foreground?: string
  /** Background color (default: #ffffff) */
  background?: string
  /** Padding ratio 0-1 (default: 0.1) */
  padding?: number
  /** Mirror pattern horizontally for symmetry */
  symmetric?: boolean
  /** Use optimized path rendering for smaller file size */
  optimized?: boolean
}

/**
 * Generate an avatar SVG from a seed
 */
export function avvatar(options: AvvatarOptions = {}): string {
  const {
    seed = Math.random().toString(),
    size = 100,
    gridSize = 5,
    foreground = '#000000',
    background = '#ffffff',
    padding = 0.1,
    symmetric = true,
    optimized = false,
  } = options

  const pattern = generatePattern({ seed, gridSize, symmetric })

  const svgOptions: SVGOptions = {
    size,
    foreground,
    background,
    padding,
  }

  return optimized
    ? renderSVGPath(pattern, svgOptions)
    : renderSVG(pattern, svgOptions)
}

/**
 * Generate a data URI for direct use in img src
 */
export function avvatarDataUri(options: AvvatarOptions = {}): string {
  const svg = avvatar(options)
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

// Export types
export type { PatternType, PatternOptions, SVGOptions }

// Export sub-modules for advanced usage
export { generatePattern } from './pattern'
export { renderSVG, renderSVGPath } from './svg'
export { hashSeed } from './hash'
