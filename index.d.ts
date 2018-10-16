import {WriteStream} from "fs";

declare module "colored-logs" {
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

    class Logger {
        public static readonly LEVELS: Level;
        public static readonly options: LoggerOptions;
        private static fileWriteStream: WriteStream | undefined;

        public readonly LEVELS: Level;
        public readonly options: LoggerOptions;
        private fileWriteStream: WriteStream | undefined;

        constructor();
        constructor(opt: LoggerOptions);

        public static log(level: Level, ...messages: any[]): void;
        public log(level: Level, ...messages: any[]): void;

        public static info(...messages: any[]): void;
        public static debug(...messages: any[]): void;
        public static warn(...messages: any[]): void;
        public static error(error: Error | string, when?: string): void;

        public info(...messages: any[]): void;
        public debug(...messages: any[]): void;
        public warn(...messages: any[]): void;
        public error(error: Error | string, when?: string): void;
    }

    export {Logger};
}