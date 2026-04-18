import { hashSeed, getHashBool, getHashInt } from './hash'

export type PatternType = 'grid' | 'rings' | 'blocks' | 'diagonal'

export interface PatternOptions {
  seed: string
  size?: number
  gridSize?: number
  symmetric?: boolean
}

export interface Pattern {
  cells: boolean[][]
  type: PatternType
  gridSize: number
}

/**
 * Generate a grid-based pattern from a seed
 */
export function generatePattern(options: PatternOptions): Pattern {
  const { seed, gridSize = 5, symmetric = true } = options
  const hash = hashSeed(seed)

  // Determine pattern type from hash
  const types: PatternType[] = ['grid', 'rings', 'blocks', 'diagonal']
  const type = types[getHashInt(hash, 0, 0, types.length - 1)]

  // Generate cells based on pattern type
  const cells: boolean[][] = []
  const halfWidth = symmetric ? Math.ceil(gridSize / 2) : gridSize

  for (let y = 0; y < gridSize; y++) {
    const row: boolean[] = []
    for (let x = 0; x < gridSize; x++) {
      const effectiveX = symmetric && x >= halfWidth ? gridSize - 1 - x : x
      const index = y * halfWidth + effectiveX + 1

      let filled: boolean
      switch (type) {
        case 'rings':
          // Concentric ring pattern
          const distFromCenter = Math.max(
            Math.abs(x - Math.floor(gridSize / 2)),
            Math.abs(y - Math.floor(gridSize / 2))
          )
          filled = getHashBool(hash, distFromCenter + index, 0.4)
          break

        case 'blocks':
          // Larger block pattern (2x2 cells share value)
          const blockX = Math.floor(effectiveX / 2)
          const blockY = Math.floor(y / 2)
          filled = getHashBool(hash, blockY * 3 + blockX + 1, 0.45)
          break

        case 'diagonal':
          // Diagonal stripe influence
          const diag = (x + y) % 3
          filled = getHashBool(hash, index, 0.35 + diag * 0.15)
          break

        default:
          // Standard grid
          filled = getHashBool(hash, index, 0.5)
      }

      row.push(filled)
    }
    cells.push(row)
  }

  return { cells, type, gridSize }
}
