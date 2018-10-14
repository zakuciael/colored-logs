import prettyFormat from "pretty-format";
import Time from "timezone-utils";
import chalk from "chalk";
import path from "path";
import util from "util";
import fs from "fs";

enum Level {
    INFO = "info",
    DEBUG = "debug",
    WARN = "warn",
    ERROR = "error"
}

function indentText(str: string) {
    return str.replace(/^(?!\s+$)/gm, " ".repeat(13)).trim();
}
function debugEnabled() {
    return process.env.DEBUG ? process.env.DEBUG.trim() !== "false" : false;
}

class Logger {
    public static timezone: string = "Europe/Warsaw";
    public static readonly LEVELS = Level;

    public static log(level: Level, ...messages: any[]): void {
        if (eval(`Logger.${level}`)) {
            eval(`Logger.${level}`).apply(this, messages);
        } else {
            this.error(new Error("Unable to find logger level: " + level.toUpperCase()), "creating log message");
        }
    }

    public static info(...messages: any[]): void {
        this.logToConsole(chalk.blue("INFO"), messages);
    }

    public static warn(...messages: any[]): void {
        this.logToConsole(chalk.yellow("WARNING"), messages);
    }

    public static error(error: Error, when?: string): void {
        this.createLogFile(error);
        this.logToConsole(chalk.red("ERROR"), [`An error occurred while ${when ? when : "doing important stuff.."}`]);
    }

    public static debug(...messages: any[]): void {
        if (!debugEnabled()) return;
        this.logToConsole(chalk.yellowBright("DEBUG"), messages);
    }

    private static logToConsole(title: string, messages: string[]): void {
        const formattedMessage = messages
            .map((message) => {
                // noinspection SuspiciousTypeOfGuard
                if (typeof message === "string") {
                    return message;
                }

                return prettyFormat(message, {
                    highlight: true,
                    min: true,
                    theme: {
                        boolean: "yellow",
                        bracket: "grey",
                        comma: "grey",
                        content: "reset",
                        date: "green",
                        error: "red",
                        function: "blue",
                        key: "cyan",
                        label: "blue",
                        misc: "grey",
                        number: "green",
                        prop: "yellow",
                        regex: "red",
                        string: "reset",
                        symbol: "red",
                        tag: "cyan",
                        value: "green",
                    },
                });
            })
            .map(indentText);

        process.stdout.write(util.format.apply(arguments, [chalk.grey(new Time(this.timezone).time()), `[${title}]`, ...formattedMessage]) + "\n");
    }

    private static createLogFile(err: Error): void {
        if (!fs.existsSync(path.resolve("logs")))
            fs.mkdirSync(path.resolve("logs"));

        const time = new Time(this.timezone);
        fs.writeFileSync(path.resolve("logs",  `${time.date()} ${time.format("HH-mm-ss")}.log`), err.stack);
    }
}

export {Logger};