# Colored Logs
Print beautiful logs with no effort, just like that!

# Example

### Code
```javascript
const {Logger} = require("./index");

Logger.info("This is a info message.");
Logger.debug("Secret stuff hidden from users.");
Logger.warn("This is a test warn message.");
Logger.error(new Error(`Little Error`), "looking on this error");
```

### Output
<img width="700px" alt="Output Screenshot" src="https://gitlab.com/ZaKKu/colored-logs/raw/master/screenshot.png?inline=false">