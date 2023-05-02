# Nitro-GUI Monorepo

This repo contains work toward a web UI for a [nitro](https://github.com/statechannels/go-nitro) powered statechannel network.

UI component demos deployed here: https://nitro-storybook.netlify.app/

## Packages

- package `site` contains the web UI ([readme](./packages/site/README.md))
- package `nitro-rpc-client` contains a typescript library for communicating with go-nitro's RPC api. ([readme](./packages/nitro-rpc-client/readme.md))

## Storybook

Components can be viewed by running `yarn storybook` or `npm run storybook` from the `packages/site` directory.
