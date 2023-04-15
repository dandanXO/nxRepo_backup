
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
