# Frontend

## Scope

- API Product
  - Website
    - NX Integrated
      - APP Name: mobile
      - APP Name: app
        - New Version
  - CMS
    - NX Packaged-Based
      - packages/dlh-web
      - packages/cms-webpack
---
## Node
```shell
nvm use 16.16
```
## Pre Development (1/1)

### NX Packaged-Based
```
cd ./packages/dlh-web
npm install --legacy-peer-deps
npm run dev:in

cd ./packages/cms-webpack
npm install --legacy-peer-deps
npm run dev:in
```

---
## Pre Development (1/2)
### NX Integrated

#### Install Packages Management Tool

[pnpm](https://pnpm.io/zh-TW/installation)

#### Install Build System

[nx](https://nx.app/)

```shell
pnpm add -g nx
```


#### Install Packages

```shell
pnpm install
```

---

## Create

```shell
# Creating a New Workspace
npx create-nx-workspace@latest

# Creating Applications and Libraries
# https://nx.dev/packages/react
nx g @nrwl/react:app my-new-app
nx g @nrwl/react:app app --bundler=webpack

# And add a new library as follows:
nx g @nrwl/react:lib my-new-lib

# Generating a Component for app
nx g @nrwl/react:component my-new-component --project=my-new-app

# Creating Hooks
nx g @nrwl/react:hook my-new-hook --project=app

# Development
# default url: http://localhost:4200/
nx serve app

# Testing Projects
nx test my-new-app
nx test my-new-lib
nx e2e my-new-app-e2e

# Building Projects
nx build my-new-app
nx build my-new-lib


```

---

## Development

#### HMR

```shell
# Run App
# nx serve [APP Name]
# Run mobile app
nx serve mobile

# Run Admin app (old)
cd packages/dlh-web
npm run dev:in

# Run Admin app (new)
cd packages/cms-webpack4
npm run dev:in
```

---

## Storybook

```shell
# Generating Storybook Configuration
nx g @nrwl/react:storybook-configuration [project-name]
```

```shell
# Storybook
# nx storybook [APP Name]

# Storybook mobile app
nx storybook mobile

# Storybook lib: shared-ui
nx storybook mobile-shared-ui

# Storybook admin app

---

```

## Lint

```shell
# Lint
# nx lint [APP Name]

# Lint mobile app
nx lint mobile

# Lint admin app

```

#### Format

```shell
# Format
# nx format
nx format:check
nx format:write
# nx format [APP Name]

# Format mobile app
nx format:check mobile
nx format:write mobile

# Format admin app
nx format:check admin
nx format:write admin
```

---

## Show Dependencies

```shell
# Graph Apps
nx graph

```

## Build

```shell
# Build App
# nx build [APP Name]

# Build mobile app
nx build mobile

# Build admin app

```

---

## Projects Command

### Base
```shell
nvm use 16.16.0
node -v
rm -rf node_modules
npm uninstall nx --location=global
npm install nx --location=global
npm install -g pnpm
pnpm install
npm -v
nx reset
```

### Mobile
```shell
pnpm nx build mobile
pnpm nx serve mobile
```

### dlh-web (old admin)
```shell
cd ./packages/dlh-web
npm install
npm run [scripts]
```

### Admin (new dlh-web)
```shell
cd ./packages/cws-webpack4
npm run [scripts]
```

---

## pnpm workspace (未使用)
```shell

# use pnpm workspace to manage packages
#Run pnpm import to generate a pnpm-lock.yaml file
pnpm import # root path cannot have pnpm-lock.yaml, otherwise cannot generate packages's pnpm-lock.yaml
# install packages's dependecies in workspace
pnpm install 

```

## Lerna (未使用)
```shell
# install lerna
# pnpx learn init # 無效
pnpx lerna init

# Bootstrapping Projects
pnpx lerna bootstrap --use-workspaces

```

## nx + lerna (未使用)
* [Integrating Nx and Lerna](https://nx.dev/recipe/lerna-and-nx)
```shell
# install nx + pnpm workspace's packages
pnpm install

pnpm nx run build

#pnpx lerna run build --scope=dlh-web 
#pnpx lerna run build --scope=backstage_system

# install package 
pnpm -F  backstage_system  add webpack-dev-server@3.11.0 -D 
```


---
# Senty

[Why am I seeing events with "Non-Error exception (or promise rejection) captured with keys: ..." using the JavaScript SDK?](https://sentry.zendesk.com/hc/en-us/articles/360057389753-Why-am-I-seeing-events-with-Non-Error-exception-or-promise-rejection-captured-with-keys-using-the-JavaScript-SDK-)
http://%5B%E4%BD%BF%E7%94%A8@sentry/webpack-plugin%E4%B8%8A%E4%BC%A0SourceMap](https://www.jianshu.com/p/11ebf61aca6e)
[Webpack 前端打包工具 - 依照指定環境挑選適合的 SourceMap 類型](https://awdr74100.github.io/2020-04-02-webpack-devtool/)
