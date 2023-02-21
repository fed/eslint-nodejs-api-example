"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lint = void 0;
const eslint_1 = require("eslint");
const eslint_plugin_jsx_a11y_1 = __importDefault(require("eslint-plugin-jsx-a11y"));
function lint() {
    return __awaiter(this, void 0, void 0, function* () {
        const eslint = new eslint_1.ESLint({
            useEslintrc: false,
            plugins: {
                'jsx-a11y': eslint_plugin_jsx_a11y_1.default,
            },
            overrideConfig: {
                parser: '@typescript-eslint/parser',
                parserOptions: {
                    sourceType: 'module',
                    ecmaVersion: 'latest',
                },
                env: {
                    es6: true,
                },
                extends: ['plugin:jsx-a11y/strict'],
                rules: {
                    'jsx-a11y/anchor-is-valid': [
                        'error',
                        {
                            components: ['Link'],
                            specialLink: ['to'],
                        },
                    ],
                },
            },
        });
        const results = yield eslint.lintFiles(['**/*.tsx']);
        const formatter = yield eslint.loadFormatter('stylish');
        const formattedResults = yield formatter.format(results);
        console.log(formattedResults);
        return formattedResults;
    });
}
exports.lint = lint;
