import { checkLanguageStatus } from "./checkLanguageStatus";
import { Client, TextChannel } from "discord.js";

export function checkLanguageStatusCommand(client: Client, channel: TextChannel) {
    checkLanguageStatus((languageList) => {
        let out = "";
        for (const language in languageList) {
            out += `${language}: ${languageList[language]}\n`;
        }
        channel.sendMessage(out);
    });
};