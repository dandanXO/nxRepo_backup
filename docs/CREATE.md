
## Create

```shell
# Creating a New Workspace
npx create-nx-workspace@latest

# Creating Applications and Libraries
# https://nx.dev/packages/react
nx g @nrwl/react:app my-new-app
nx g @nrwl/react:app app --bundler=webpack

# [Creating a new JS library](https://nx.dev/packages/esbuild/documents/overview#creating-a-new-js-library)
#bundler should be one of swc,tsc,rollup,vite,esbuild,none
nx g @nrwl/js:lib shared/domain --bundler=tsc
nx g @nrwl/js:lib shared/domain --bundler=swc
nx g @nrwl/js:lib shared/domain --bundler=esbuild



# And add a new react library as follows:
nx g @nrwl/react:lib my-new-lib
nx g @nrwl/react:lib shared/domain

# Generating a Component for app
nx g @nrwl/react:component my-new-component --project=my-new-app

# Creating Hooks
nx g @nrwl/react:hook my-new-hook --project=app

# Development
# default url: http://localhost:4200/
nx serve app
# add package
# windicss
# mode: 
# interpret mode, compile mode
# https://windicss.org/posts/modes.html
# attributify mode: https://windicss.org/posts/attributify.html


#https://windicss.org/integrations/webpack.html
pnpm add -D windicss
pnpm add -D windicss-webpack-plugin

# Testing Projects
nx test my-new-app
nx test my-new-lib
nx e2e my-new-app-e2e

# Building Projects
nx build my-new-app
nx build my-new-lib


```

## Remove
[@nrwl/workspace:remove](https://nx.dev/packages/workspace/generators/remove)
```shell
nx generate remove gateway
#same
nx g rm gateway
# dry-run
nx g remove gateway --dry-run

```
