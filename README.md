# BOC Parser

Web tool to help parse TON blockchain BOC files to double-check their content before sending to mainnet.

## Usage

1. Open the parser website (available on https://ton-defi-org.github.io/boc-parser/)
 
2. Open the BOC file to parse through the UI.

3. Example successful output:

```
flags 18
EQBP4mzpDIywL1SV-Wp9ZuBBlzprR9eXQgSYGEXiUEHm7yYF
50000000
```

To reload a new boc file please refresh the page.

## Development

To build a new version of the website and deploy to GitHub pages:

```
npm install
npm run build
```

The build output will be found in the `./docs` directory. By pushing everything to master, the `./docs` directory will be pushed as well and GitHub pages will be deployed.
