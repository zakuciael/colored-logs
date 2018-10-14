declare module "colored-logs" {

    enum Level {
        INFO = "info",
        DEBUG = "debug",
        WARN = "warn",
        ERROR = "error"
    }

    class Logger {
        public static timezone: string;
        public static readonly LEVELS: Level;

        public static log(level: Level, ...messages: any[]): void;

        public static info(...messages: any[]): void;
        public static debug(...messages: any[]): void;
        public static warn(...messages: any[]): void;
        public static error(error: Error, when?: string): void;

        private static logToConsole(title: string, messages: string[]): void;
        private static createLogFile(err: Error): void;
    }

    export {Logger};
}