# Colored Logs
![npm](https://img.shields.io/npm/v/colored-logs?label=NPM%20Version&style=flat-square)
![npm](https://img.shields.io/npm/dt/colored-logs?label=NPM%20Downloads&style=flat-square)

Simple yet elegant logger for your node.js application.

## Installation
#### Using Yarn
```bash
yarn add colored-logs
```
#### Using NPM
```bash
npm install colored-logs
```

## Usage

#### Basic
```js
const {Logger} = require("colored-logs");

Logger.info("This is a info message.");
Logger.debug("Secret stuff hidden from users.");
Logger.warn("This is a test warn message.");
Logger.error(new Error(`Little Error`), "looking on this error");
```

#### With Custom Options
```js
const {Logger} = require("colored-logs");
new Logger({
    level: "info",
    filePath: "./path/to/file.log"
});

Logger.info("This is a info message.");
Logger.debug("Secret stuff hidden from users.");
Logger.warn("This is a test warn message.");
Logger.error(new Error(`Little Error`), "looking on this error");
```

## Configuration Options
 - ``LoggerOptions``: Configures logger to fit your needs. Possible values:
   - ``level`` -  Logging levels conform to the severity ordering specified by "from most important to least important"
   - ``filePath`` - Path to a file in which logs will appear
   - ``timezone`` - Controls timezone that is used across the Logger
   - ``timed_logs`` - If enabled and ``filePath`` is not set creates a log file with time of the first log.

## Output Example
<img width="700px" alt="Output Screenshot" src="https://gitlab.com/ZaKKu/colored-logs/raw/master/screenshot.png?inline=false">
