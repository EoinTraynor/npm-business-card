# Eoin Traynor - Digital NPM Business Card 💼

Interactive CLI business card published to npm.

[![version](https://img.shields.io/npm/v/eointraynor)](https://www.npmjs.com/package/eointraynor)
[![downloads](https://img.shields.io/npm/dt/eointraynor)](https://www.npmjs.com/package/eointraynor)
[![issues](https://img.shields.io/github/issues-raw/EoinTraynor/npm-business-card)](https://github.com/EoinTraynor/npm-business-card/issues)

## Usage

Run directly via `npx` (no installation required):

```sh
npx eointraynor
```

<p align="center">
  <img src="docs/assets/npx-eointraynor.gif" alt="npx eointraynor demo" width="620">
</p>

### Options

```sh
npx eointraynor [options]

Options:
  -s, --static       Print the card and exit without interactive prompt
  -j, --json         Output raw card configuration in JSON format
  -v, --version      Show CLI version
  -h, --help         Show help menu
```

## Features

- ⚡ **Zero Runtime Dependencies**: Standalone bundle with zero external runtime dependencies for instant execution.
- 🎨 **Modern Visuals**: Security & Tech theme with rounded slate borders, vibrant coral/crimson accents, and clean layout.
- 🔗 **OSC 8 Hyperlinks**: Clickable links in modern terminal emulators (iTerm2, Kitty, VS Code, Windows Terminal, GNOME Terminal).
- ⌨️ **Interactive Menu**: Arrow-key navigation to launch profiles in your default browser or read a bio summary.
- 🛡️ **CI-Friendly & Defensive**: Automatically detects TTY; outputs clean static text when piped or in CI.

## Development

```sh
# Install dependencies
npm install

# Typecheck
npm run typecheck

# Build standalone bundle
npm run build

# Run locally
npm start
```
