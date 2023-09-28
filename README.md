# HackYeah23

This monorepo uses [Turborepo](https://turborepo.org) as a build system and [yarn](https://yarnpkg.com) as a packages manager.

Pre-configured setup for this monorepo includes:

- [TypeScript](https://www.typescriptlang.org) for static type checking
- [ESLint](https://eslint.org) for code linting
- [Prettier](https://prettier.io) for code formatting

## Apps and packages

Below you can find list of components of the monorepo. Each app/package is 100% [TypeScript](https://www.typescriptlang.org).

#### Apps

- `web-app`: A [Next.js](https://nextjs.org) app - this is the default one specified in `Dockerfile` to be build and run inside container

#### Packages

- `ui`: A [React](https://reactjs.org) and [Tailwind Variants](https://www.tailwind-variants.org) component library, also contains themes definitions
- `plop`: A set of generators made with [Plop.js](https://plopjs.com), can be used to setup boilerplate for other apps and packages
- `storybook`: An optimized setup of [Storybook](https://storybook.js.org) collecting all the stories throughout the monorepo
- `utils`: Utilities (such as standard helper functions, but also React hooks) to be used in apps
- `eslint-config-custom`: An [ESlint](https://eslint.org) configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: Extendable `tsconfig.json`s used throughout the monorepo

## Npm scripts

To build all apps and packages, use the commands described below. Please note that configuration of repository-wide [pipelines](https://turborepo.org/docs/core-concepts/pipelines) are specified in `turbo.json` file in root directory.

**Scripts specific for selected apps and packages are located in appropriate** `package.json` **files!**

#### Scripts used by Turbo pipelines

- `dev`: Runs `dev` command in in all apps and packages which has such script specified
- `build`: Builds all packages
- `clean`: Cleans caches and installed `node_modules` directories recurrently
- `lint`: Runs [ESLint](https://eslint.org) linters of all apps and packages
- `test`: Runs pipeline of [Jest](https://jestjs.io) tests in watch mode
- `test:ci`: Runs pipeline of all [Jest](https://jestjs.io) tests, then displays summary and quits

#### Release scripts

- `release:major`: A [Standard Version](https://github.com/conventional-changelog/standard-version) release script which creates git tags and `CHANGELOG.md` file. This releases major version, so if current version goes from 0.0.0 to 1.0.0
- `release:minor`: Similar to above one, yet if current version is 0.0.0 it is bumped to 0.1.0
- `release:patch`: Similar to above one, yet if current version is 0.0.0 it is bumped to 0.0.1

#### Repository-wide scripts

- `format`: Runs [Prettier](https://prettier.io/) formatter for all specified files across whole repository

## Contributing

This monorepo follows the rules of [Conventional Commits](https://conventionalcommits.org) specification. It enforces to use convenient, human-readable commit messages format validated by [Commitlint](https://commitlint.js.org) and [Standard Version](https://github.com/conventional-changelog/standard-version) tools. To view the details, please check the content of `.commitlintrc.json` and `.versionrc.json` files. Following the rules allows to generate `CHANGELOG.md` file using `npm` script either manually or in CI/CD pipeline (in this case take a look at `standard-version` section in `package.json` to add proper variable if its different than `[skip ci]`!).
