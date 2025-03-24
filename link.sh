rm -rf node_modules
yarn
cd ../oidc-spa
rm -rf node_modules .yarn_home dist
yarn
yarn build
yarn link-in-app oidc-spa-electron
npx tsc -w