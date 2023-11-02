## Create

```shell
# Creating a New Workspace
npx create-nx-workspace@latest

# Creating Applications and Libraries
# https://nx.dev/packages/react
nx g @nx/react:app my-new-app
nx g @nx/react:app app --bundler=webpack

#In Nx 18, generating projects will no longer derive the name and root.
#Please provide the exact project name and root in the future.
#Example: nx g @nx/react:application gambling --directory gambling
nx g @nx/react:app my-new-app --directory apps
nx g @nx/react:app app --bundler=webpack --directory apps

# Move
nx g @nx/workspace:move --project my-feature-lib --destination shared/my-feature-lib





# [Creating a new JS library](https://nx.dev/packages/esbuild/documents/overview#creating-a-new-js-library)
#bundler should be one of swc,tsc,rollup,vite,esbuild,none
nx g @nx/js:lib shared/domain --bundler=tsc
nx g @nx/js:lib shared/domain --bundler=swc
nx g @nx/js:lib shared/domain --bundler=esbuild

# Dry Run
-d, --dryRun
nx g @nx/js:lib shared/date --bundler=tsc


# And add a new react library as follows:
nx g @nx/react:lib my-new-lib
nx g @nx/react:lib shared/domain

# Generating a Component for app
nx g @nx/react:component my-new-component --project=my-new-app

# Creating Hooks
nx g @nx/react:hook my-new-hook --project=app

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

[@nx/workspace:remove](https://nx.dev/packages/workspace/generators/remove)

```shell
nx generate remove gateway
#same
nx g rm gateway
# dry-run
nx g remove gateway --dry-run

```
