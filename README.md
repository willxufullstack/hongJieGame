# HongJie Match3 Game

A Match3 game developed with TypeScript and PixiJS, following Robotlegs micro-architecture design.

![cover](img_cover_match3.png)

## Gameplay Demo

![gameplay](gif_match3_ts_demo.gif)

## Tech Stack

- **Language**: TypeScript
- **Graphics Engine**: PixiJS
- **Architecture**: RobotlegsJS
- **Build Tool**: Webpack
- **Testing Framework**: Karma + Mocha

## Project Structure

```
hongJieGame/
├── src/                    # Source code
│   ├── index.ts           # Entry point
│   └── matchthree/        # Game core logic
├── assets/                # Game assets
│   ├── atlas/            # Image resources
│   ├── backgrounds/      # Background images
│   └── fonts/           # Font files
├── test/                  # Test files
├── media/                 # Media files
├── package.json          # Project configuration
├── webpack.config.js     # Webpack configuration
└── tsconfig.json         # TypeScript configuration
```

## Quick Start

### Requirements

- Node.js (v14 or higher recommended)
- npm or yarn

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm start
```

The game will be available at `http://localhost:8080`

### Other Commands

```bash
# Code formatting
npm run autoformat

# Run tests
npm test

# Code linting
npm run lint
```

## Game Features

- Classic Match3 gameplay
- Smooth animations
- Responsive design
- Complete test coverage

## Development Notes

This project uses modular architecture with main modules:

- **Game Manager**: Game state management
- **Grid System**: Grid system
- **Piece System**: Game piece system
- **Animation System**: Animation system
- **Score System**: Scoring system

## License

MIT License

---

**HongJie** - Game Developer