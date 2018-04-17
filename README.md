# Doc Worker

Doc Worker was born out of a desier to be able to generate a JavaScript
documentation site from Markdown files and, if present, code comments
(à la JSDoc).

## How to Use

Using Doc Worker is no different than any other NPM package.

### Install

Install it to your project using:

```shell
my-proj> npm i -D docworker
```

### Add an NPM Script

Create a script in your `package.json` using Doc Worker:

```json
{
  "scripts": {
    "docs": "docworker"
  }
}
```

### Run the Script

Then you can generate your docs by running:

```shell
my-proj> npm run docs
```

## Configuration

Doc Worker needs to know where to pull documentation from and where
to put the generated site.

### Configuration File

The configuration file can either be a JavaScript or JSON file which can
specify the following options:

- `src`: the directory to look in for documentation
- `dest`: the directory to output the site to

### Defaults

The defaults for Doc Worker:

- Source directory: `./src/`
- Destination: `./docs/`

Doc Worker will look for a configuration file named `.docworker.config.js` or
`.docworker.config.json` in your project's root directory. If a file cannot be
found with that name, it will use the above defaults. Also, by default, Doc Worker
will not look in `node_modules` for documentation.

### Command Line Options

Options can also be set from the command line or as part of a NPM script. In addition
to the above configuration options, the configuration file can also be specified
using `config`.

Below is how this can be done as an NPM script:

```json
{
  "script": {
    "docs": "docworker --config=./my-doc.config.js --dest=./built-docs",
  }
}
```
