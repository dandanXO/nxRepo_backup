# Frontend

## Scope

- API Product
  - Website
    - APP Name: mobile
  - CMS
    - APP Name: admin

## Development

### Install Packages Management Tool

[pnpm](https://pnpm.io/zh-TW/installation)

### Install Packages

```shell
pnpm install
```

### Install Build System

[nx](https://nx.app/)

```shell
pnpm add -g nx
```

### Development

#### HMR

```shell
# Run App
# nx serve [APP Name]

# Run mobile app
nx serve mobile

# Run admin app
nx serve admin
```

#### Storybook

```shell
# Generating Storybook Configuration
nx g @nrwl/react:storybook-configuration [project-name]

# Storybook
# nx storybook [APP Name]

# Storybook mobile app
nx storybook mobile

# Storybook admin app
nx storybook admin

# Storybook lib: shared-ui
nx storybook mobile-shared-ui
```

#### Lint

```shell
# Lint
# nx lint [APP Name]

# Lint mobile app
nx lint mobile

# Lint admin app
nx lint admin
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

### Show Dependencies

```shell
# Graph Apps
nx graph

```

### Build

```shell
# Build App
# nx build [APP Name]

# Build mobile app
nx build mobile

# Build admin app
nx build admin
```

## Recipe

- Git
  - [Commit Message Guidelines](https://gist.github.com/brianclements/841ea7bffdb01346392c)
- Nx
  - [Mental Model](https://nx.dev/concepts/mental-model)
  - Core Features
  - Plugin Features
  - Conceipts
    - [Monorepos](https://nx.dev/more-concepts/why-monorepos)
    - _[Applications and libraries](https://nx.dev/more-concepts/applications-and-libraries)_
    - [Publishable and Buildable Nx Libraries](https://nx.dev/more-concepts/buildable-and-publishable-libraries)
    - Library
      - [Creating Libraries](https://nx.dev/more-concepts/creating-libraries)
      - [Library Types](https://nx.dev/more-concepts/library-types)
      - [Grouping Libraries](https://nx.dev/more-concepts/grouping-libraries)
    - [Using Nx at Enterprises](https://nx.dev/more-concepts/monorepo-nx-enterprise#code-organization-&-naming-conventions)
    - [Tag in Multiple Dimensions](https://nx.dev/recipe/tag-multiple-dimensions)
    - [Enforce Project Boundaries](https://nx.dev/core-features/enforce-project-boundaries)

## Best Practices

![](./docs/organization.png)

- importants
  - mental model
    - application
      - as containers, link, bundld and compile implemented in libraries
      - place 80% of your logic intor the libs/folder
      - and 20% into apps
    - libraries
  - library Types
    - feature
    - ui
    - data-access
    - utility
    - share

```shell
# --dry-run
nx g @nrwl/workspace:library feature-bank --dry-run --directory=account/mobile --tags=scope:mobile,type:feature

# directory: mobile/account/feature-bank , library-type: feature, name: feature-bank, tags: scope:mobile, type:feature
nx g @nrwl/workspace:library feature-bank --directory=account/mobile --tags=scope:mobile,type:feature

# directory: mobile/shared/ui , library-type: ui, name: ui tags: scope:mobile, type:ui
# dry run
nx g @nrwl/react:library ui --dry-run --directory=mobile/shared --tags=scope:mobile,type:ui
# run
nx g @nrwl/react:library ui --directory=mobile/shared --tags=scope:mobile,type:ui

```
