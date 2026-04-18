import { avvatar } from '../src'
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

// Sample Ethereum addresses
const addresses = [
  '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // vitalik.eth
  '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B', // Random
  '0x1234567890abcdef1234567890abcdef12345678',
  '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef',
  '0xcafebabecafebabecafebabecafebabecafebabe',
]

// Create output directory
const outDir = join(__dirname, 'output')
mkdirSync(outDir, { recursive: true })

// Generate avatars
addresses.forEach((address, i) => {
  const svg = avvatar({
    seed: address,
    size: 200,
    gridSize: 5,
  })

  writeFileSync(join(outDir, `avatar-${i + 1}.svg`), svg)
  console.log(`Generated avatar for ${address.slice(0, 10)}...`)
})

// Generate variations
const seed = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'

// Different grid sizes
;[4, 5, 6, 7, 8].forEach((gridSize) => {
  const svg = avvatar({ seed, gridSize, size: 200 })
  writeFileSync(join(outDir, `grid-${gridSize}.svg`), svg)
})

// Inverted colors
const inverted = avvatar({
  seed,
  foreground: '#ffffff',
  background: '#000000',
  size: 200,
})
writeFileSync(join(outDir, 'inverted.svg'), inverted)

console.log(`\nAll avatars saved to ${outDir}`)
