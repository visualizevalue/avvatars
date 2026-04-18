/**
 * Simple hash function to convert a seed string into deterministic random values
 */
export function hashSeed(seed: string): number[] {
  const hash: number[] = []

  // Create a simple but effective hash from the seed
  let h1 = 0xdeadbeef
  let h2 = 0x41c6ce57

  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i)
    h1 = Math.imul(h1 ^ char, 2654435761)
    h2 = Math.imul(h2 ^ char, 1597334677)
  }

  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507)
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507)
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909)

  // Generate array of pseudo-random values from the hash
  let state = h1 + h2
  for (let i = 0; i < 64; i++) {
    state = Math.imul(state ^ (state >>> 15), 1 | state)
    state ^= state + Math.imul(state ^ (state >>> 7), 61 | state)
    hash.push(((state ^ (state >>> 14)) >>> 0) / 4294967296)
  }

  return hash
}

/**
 * Get a deterministic random value from the hash at a specific index
 */
export function getHashValue(hash: number[], index: number): number {
  return hash[index % hash.length]
}

/**
 * Get a boolean from hash at index
 */
export function getHashBool(hash: number[], index: number, threshold = 0.5): boolean {
  return getHashValue(hash, index) > threshold
}

/**
 * Get an integer in range from hash at index
 */
export function getHashInt(hash: number[], index: number, min: number, max: number): number {
  return Math.floor(getHashValue(hash, index) * (max - min + 1)) + min
}
