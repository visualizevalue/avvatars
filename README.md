# avvatars

A tiny library for generating geometric avatars as SVGs.

## Install

```bash
pnpm add @visualizevalue/avvatars
```

## Usage

```typescript
import { avvatar } from '@visualizevalue/avvatars'

// Generate an avatar from an Ethereum address
const svg = avvatar({
  seed: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
})

// Use as img src
const dataUri = avvatarDataUri({ seed: '0x...' })
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `seed` | `string` | random | Seed string (e.g., Ethereum address) |
| `size` | `number` | `100` | Output size in pixels |
| `gridSize` | `number` | `5` | Grid resolution (4-8 recommended) |
| `foreground` | `string` | `#000000` | Foreground color |
| `background` | `string` | `#ffffff` | Background color |
| `padding` | `number` | `0.1` | Padding ratio (0-1) |
| `rounded` | `boolean` | `false` | Rounded corners |
| `symmetric` | `boolean` | `true` | Mirror pattern horizontally |
| `optimized` | `boolean` | `false` | Use path rendering for smaller files |

## Examples

```typescript
// Basic
avvatar({ seed: '0x...' })

// Larger grid
avvatar({ seed: '0x...', gridSize: 8 })

// Rounded corners
avvatar({ seed: '0x...', rounded: true })

// Inverted colors
avvatar({
  seed: '0x...',
  foreground: '#ffffff',
  background: '#000000'
})

// Custom size with no padding
avvatar({
  seed: '0x...',
  size: 256,
  padding: 0
})
```

## License

WTFPL
