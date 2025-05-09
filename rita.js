//obtained from RiTa.js GitHub: https://github.com/dhowe/ritajs/tree/main
//pasted the script for package.json
{
  "name": "rita",
  "version": "3.1.3",
  "author": "Daniel C Howe",
  "description": "tools for generative natural language",
  "homepage": "https://rednoise.org/rita",
  "license": "GPL-3.0",
  "type": "module",
  "scripts": {
    "test": "NODE_ENV=dev npx mocha",
    "test:dist": "NODE_ENV=dev npx mocha test/dist",
    "build": "rm -rf dist/ && npx tsup && cp types/rita.d.* dist/",
    "types": "npx tsc",
    "pub": "./npnb/source/cli.js --no-release-draft --test-script test:dist patch",
    "prepub": "npm version patch && npm run build"
  },
  "main": "dist/rita.js",
  "types": "dist/rita.d.ts",
  "browser": "./dist/rita.min.js",
  "exports": {
    ".": {
      "import": "./dist/rita.js",
      "require": "./dist/rita.cjs"
    }
  },
  "files": [
    "dist"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/dhowe/ritajs.git"
  },
  "engines": {
    "node": ">=14.0"
  },
  "keywords": [
    "natural language",
    "generative text",
    "text analysis"
  ],
  "bugs": {
    "url": "https://github.com/dhowe/ritajs/issues"
  },
  "devDependencies": {
    "@types/chai": "^4.3.9",
    "@types/mocha": "^10.0.3",
    "@types/node": "^20.8.10",
    "chai": "^4.3.10",
    "esbuild-plugin-version-injector": "^1.2.1",
    "mocha": "^10.2.0",
    "tsup": "^7.2.0",
    "typescript": "^5.2.2"
  },
  "dependencies": {
    "@ungap/structured-clone": "^1.2.0",
    "riscript": "^1.0.66"
  }
}