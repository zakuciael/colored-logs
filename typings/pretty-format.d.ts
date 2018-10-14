declare module "pretty-format" {
    export default function prettyFormat(value: any, options?: Options): string;

    export interface Options {
        /**
         * Call `toJSON()` on passed object.
         */
        callToJSON?: boolean;
        /**
         * Escape special characters in regular expressions.
         */
        escapeRegex?: boolean;
        /**
         * Highlight syntax for terminal (works only with `ReactTestComponent` and `ReactElement` plugins.
         */
        highlight?: boolean;
        /**
         * Number of spaces for indentation.
         */
        indent?: number;
        /**
         * Print only this number of levels.
         */
        maxDepth?: number;
        /**
         * Print without whitespace.
         */
        min?: boolean;
        /**
         * plugins to serialize application-specific data types
         */
        plugins?: Plugin[];
        /**
         * Print function names or just [Function].
         */
        printFunctionName?: boolean;
        /**
         * Syntax highlight theme.
         * Uses [ansi-styles colors](https://github.com/chalk/ansi-styles#colors) + `reset` for no color.
         */
        theme?: Theme;
    }

    export interface Plugin {
        test(value: any): boolean;
        print(value: any, serialize: Print, indent: Indent, options: Options, colors: Colors): string;
    }

    export const plugins: Record<"AsymmetricMatcher" | "ConvertAnsi" | "HTMLElement" | "Immutable" | "ReactElement" | "ReactTestComponent", Plugin>;
    export type Print = (value: any) => string;
    export type Indent = (value: string) => string;

    export interface Colors {
        comment: { close: string; open: string };
        content: { close: string; open: string };
        prop: { close: string; open: string };
        tag: { close: string; open: string };
        value: { close: string; open: string };
    }

    export interface Theme {
        boolean: string;
        bracket: string;
        comma: string;
        content: string;
        date: string;
        error: string;
        function: string;
        key: string;
        label: string;
        misc: string;
        number: string;
        prop: string;
        regex: string;
        string: string;
        symbol: string;
        tag: string;
        value: string;
    }
}