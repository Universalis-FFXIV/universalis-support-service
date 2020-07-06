"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLanguageStatus = void 0;
const bent_1 = __importDefault(require("bent"));
const { poeditor_token, po_editor_id } = require("../config.json");
const poeditor = bent_1.default("https://api.poeditor.com/v2", "buffer");
/** Returns an object of language completion values, with percentage outputs. */
function checkLanguageStatus(fn) {
    poeditor("/languages/list", {
        api_token: poeditor_token,
        id: po_editor_id,
    }).then(res => {
        const data = JSON.parse(res.toString());
        const out = {};
        for (const languageInfo of data.result.languages) {
            out[languageInfo.name] = languageInfo.percentage;
        }
        fn(out);
    });
}
exports.checkLanguageStatus = checkLanguageStatus;
