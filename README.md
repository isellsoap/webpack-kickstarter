# webpack-kickstarter

Kickstarter to easily get started with my personal projects.

## Installation

### Prerequisites

The Node version with which dependencies need to be installed in this repository is explicitely restricted, so be sure to have [nvm](https://github.com/creationix/nvm) installed globally ([installation instructions](https://github.com/creationix/nvm#install--update-script)) to be able to easily switch between Node versions.

Steps:

1. `git clone git@github.com:isellsoap/webpack-kickstarter.git`
2. `cd webpack-kickstarter/`
3. `nvm install` uses version from [.nvmrc](.nvmrc)
4. `nvm use` uses version from [.nvmrc](.nvmrc)
5. `npm i`

## Structure

```bash
├── src/               # all app assets
├── test/              # test infrastructure
├── .browserslistrc    # Browserslist configuration
├── .editorconfig      # text editor configuration
├── .eslintignore      # files not processed by ESLint
├── .eslintrc.js       # ESLint configuration
├── .gitignore         # files not tracked by Git
├── .npmrc             # npm configuration
├── .nvmrc             # nvm configuration
├── .prettierignore    # files not processed by Prettier
├── .prettierrc        # Prettier configuration
├── .stylelintrc.js    # stylelint configuration
├── babel.config.js    # Babel configuration
├── package-lock.json  # npm package lock
├── package.json       # Node.js package manifest
├── README.md          # This file
├── tsconfig.json      # TypeScript configuration
├── webpack.config.ts  # webpack configuration
```

## NPM scripts

| Command         | Description                                      |
| --------------- | ------------------------------------------------ |
| `npm start`     | start server in watch mode for local development |
| `npm run tsc`   | TypeScript typecheck                             |
| `npm run lint`  | Evaluate all Linter rules (css, ts, ...)         |
| `npm run dist`  | build dist(ribution)                             |
| `npm run build` | install, clean, test, lint, dist in one step     |
