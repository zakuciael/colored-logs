# Colored Logs
Print beautiful logs with no effort, just like that!

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

## License
[MIT License](http://www.opensource.org/licenses/mit-license.php)

## Author
[Krzysztof Saczuk (ZaKKu)](https://zakku.eu)