# Frontend

## Scope
* API Product
  * Website
    * APP Name: mobile 
  * CMS
    * APP Name: admin

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
```shell
# Run App
# nx serve [APP Name]

# Run mobile app
nx serve mobile

# Run admin app
nx serve admin
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
