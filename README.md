# JUSTFLIGHT

A very simple Betaflight configurator 🎮 ✈️ 🌟

If you like it, support me with a star 😘

<p align="center">
  <img width="450" src="https://github.com/dindonus/justflight/blob/master/public/demo.gif" alt="demo">
</p>

Related links :

- [Betaflight firmware](https://github.com/betaflight/betaflight/)
- [Betaflight tuning tips 3.4](https://github.com/betaflight/betaflight/wiki/Tuning-Tips-for-Betaflight-3.4)
- [Betaflight configurator for advanced features](https://github.com/betaflight/betaflight-configurator)

## Why Justflight?

- ✈️ Pilots should focus on flying in order to progress.
- 💭 Overthink tuning is a waste of time for a majority of us.
- 🌟 Betaflight is amazing on defaults PIDs.
- 😕 Betaflight configuratior is intimidating for beginners.
- 💥 Betaflight configuratior is not the best to setup multiple quads quickly without making mistakes.
- ⏱️ Each new Betaflight versions require a time investment.

### JustFlight focus on :

- 🏖️ A super easy setup, in 4 clicks your quad is ready to fly.
- 🎮 A distraction free tuning section, offering essentials choices.
- 😎 An automatic optimization to set all the coolest and newest features for your board.

## Currents limitations

JustFlight is very young, new features are coming!

Most populars missing features : RSSI, Smart audio, Yaw rates, OSD customization.

Actuals settings selection / defaults / ranges / optimizations can certainly be improved a lot (with you help!).

## How to try it

💻 🍏 🐧 Available for Windows / Mac / Linux (with your help!)

JustFlight is distributed as a open source software.

Today, only the Mac version is ready. Compilation for any platforms should be pretty easy (see development section).

## Contributions

We need you!

- Compile binaries for Windows and Linux. Mac is OK.
- Create an issue for any feed back, suggestions, important missing setting, better adjustment, etc..
- Found a bug? Please create an issue.
- Code some adapters for previous / next versions of Betaflight.
- Code some setting handlers to handle more settings.

Thank you to all the people who already contributed 💕

### Pull requests

PRs are **welcome**!

⚠️ Please keep in mind the goal is to keep the JustFlight user interface as simple as possible.

## Development

Require [Node](https://nodejs.org/) >= 10 (but may also works with Node 6)

Run it locally:

```
npm install
npm run dev
```

Compile for your platform:

```
npm run package
```

This command will create a `build/` folder, which contains your ready to use binaries.

The stack:

[React](https://facebook.github.io/react/) /
[Redux](http://redux.js.org/) /
[Thunk](https://github.com/reduxjs/redux-thunk) /
[Webpack](https://webpack.github.io/) /
[Electron](http://electron.atom.io/) /
[ESLint](http://eslint.org/) /
[Jest](https://facebook.github.io/jest/) /
[Yarn](https://yarnpkg.com/)

### Structure explaination:

```
└── src/
    ├── board/               # Interface over the board to allow easy communication
    │   ├── usb.js           # Simplified interface over LIB_USB
    │   └── ...              # Few helpers related to usb and board
    ├── pages/               # All pages of the app, pages use components
    ├── components/          # Small blocks of interface, used by pages
    ├── settings/            # Interface over settings management
    │   ├── adapters.js      # Interface over a specific version of Betaflight
    │   └── handlers.js      # Allow to read & write setting, used by adapters
    └── store/               # A classic Redux store to manage app state
```

Adapters and handlers are **easy to understand**, you should take a look 🤓

## Stay In Touch

- [Nicolas Cordin on Twitter](https://twitter.com/NicoDindon)

## License

GPL
