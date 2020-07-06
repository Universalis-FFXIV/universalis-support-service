"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLanguageStatusCommand = void 0;
const checkLanguageStatus_1 = require("./checkLanguageStatus");
function checkLanguageStatusCommand(client, channel) {
    checkLanguageStatus_1.checkLanguageStatus((languageList) => {
        let out = "";
        for (const language in languageList) {
            out += `${language}: ${languageList[language]}\n`;
        }
        channel.sendMessage(out);
    });
}
exports.checkLanguageStatusCommand = checkLanguageStatusCommand;
;
