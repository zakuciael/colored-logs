import prettyFormat from "pretty-format";
import Time from "timezone-utils";
import path from "path";
import util from "util";
import fs, {WriteStream} from "fs";
import chalk from "chalk";

enum Level {
    ERROR = "error",
    WARN = "warn",
    INFO = "info",
    DEBUG = "debug",
}

interface LoggerOptions {
    level?: string;
    filePath?: string;
    timezone?: string;
    timed_logs?: boolean;
}

const options: LoggerOptions = {
    level: process.env.LOG_LEVEL || (process.env.DEBUG ? Level.DEBUG : Level.INFO),
    timezone: new Time().timezone,
    filePath: undefined,
    timed_logs: true
};

class Logger {
    public static readonly LEVELS = Level;
    public static readonly options = options;
    private static fileWriteStream: WriteStream | undefined;

    public readonly LEVELS = Level;
    public readonly options = options;
    private fileWriteStream: WriteStream | undefined;

    constructor(opt: LoggerOptions = {}) {
        if (Object.values(this.LEVELS).indexOf(opt.level) === -1) opt.level = this.LEVELS.INFO;
        if (opt.filePath) opt.timed_logs = false;
        Object.assign(options, opt);
    }

    /* Main Method */
    public static log(level: Level, ...messages: any[]) {
        if (Object.values(this.LEVELS).indexOf(level) > Object.values(this.LEVELS).indexOf(this.options.level)) return;

        const titles: { [key: string]: string } = {};
        titles[this.LEVELS.ERROR] = chalk.red(this.LEVELS.ERROR.toUpperCase());
        titles[this.LEVELS.WARN] = chalk.yellow(this.LEVELS.WARN.toUpperCase());
        titles[this.LEVELS.INFO] = chalk.blue(this.LEVELS.INFO.toUpperCase());
        titles[this.LEVELS.DEBUG] = chalk.yellowBright(this.LEVELS.DEBUG.toUpperCase());

        let error: Error | undefined;
        if (messages[1] instanceof Error && level === this.LEVELS.ERROR) {
            error = messages[1];
            messages = messages.slice(0, 1);
        }

        const formatted = messages.map((m) => {
            if (typeof m === "string") return m;

            return prettyFormat(m, {
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
        }).map((m) => m.replace(/^(?!\s+$)/gm, " ".repeat(13)).trim());

        if (!this.fileWriteStream) {
            if (this.options.filePath && !this.options.timed_logs) {

                let i = 1;
                while (fs.existsSync(path.resolve(this.options.filePath))) {
                    let dir = path.dirname(this.options.filePath);
                    let fileName = path.basename(this.options.filePath).split(".").shift();
                    let ext = path.extname(this.options.filePath);
                    this.options.filePath = `${dir}/${fileName ? fileName.replace(/-\d+/g, "") : ""}-${i}${ext}`;
                    i++;
                }

                this.fileWriteStream = fs.createWriteStream(path.resolve(this.options.filePath));
            } else {
                let time = new Time(this.options.timezone);
                if (!fs.existsSync(path.resolve("./logs"))) fs.mkdirSync(path.resolve("./logs"));
                this.fileWriteStream = fs.createWriteStream(path.resolve(`./logs/${time.date()} ${time.format("HH-mm-ss")}.log`));
            }
        }

        process.stdout.write(util.format.apply(arguments, [chalk.grey(new Time(this.options.timezone).time()), `[${titles[level]}]`, ...formatted]) + "\n");
        this.fileWriteStream.write(`${new Time(this.options.timezone).time()} [${level.toUpperCase()}] ${formatted.join(" ")}\n`);

        if (error) {
            process.stdout.write(util.format.apply(arguments, [error]) + "\n");
            this.fileWriteStream.write(error.stack + "\n");
        }
    }

    /* Static Methods */
    public static info = (...messages: any[]) => Logger.log(Level.INFO, ...messages);
    public static debug = (...messages: any[]) => Logger.log(Level.DEBUG, ...messages);
    public static warn = (...messages: any[]) => Logger.log(Level.WARN, ...messages);
    public static error = (error: Error | string, when?: string) => {
        if (typeof error === "string") error = new Error(error);

        return Logger.log(Level.ERROR, `An error occurred while ${when ? when : "doing important stuff..."}`, error);
    };

    /* Non-Static Methods */
    public log = (level: Level, ...messages: any[]) => Logger.log(level, ...messages);
    public info = (...messages: any[]) => Logger.log(Level.INFO, ...messages);
    public debug = (...messages: any[]) => Logger.log(Level.DEBUG, ...messages);
    public warn = (...messages: any[]) => Logger.log(Level.WARN, ...messages);
    public error = (error: Error | string, when?: string) => Logger.error(error, when);
}

export {Logger};