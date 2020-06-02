import * as Discord from "discord.js";
import * as Winston from "winston";

import { messageReactionAddRemove } from "./events/messageReactionAddRemove";
import { ReactionAction } from "./types/ReactionAction";
import { checkDiskUsageCommand } from "./checkDiskUsageCommand";
import { alertDiskSize } from "./cronjobs/alertDiskSize";

const { token } = require("../config.json");

const client = new Discord.Client();
const logger = Winston.createLogger({
    level: "info",
    format: Winston.format.simple(),
    transports: [
        new Winston.transports.Console(),
        new Winston.transports.File({
            filename: "error.log",
            level: "error",
        }),
    ],
});

client.login(token)
.then(async () => {
    logger.info(`Logged in as ${client.user.username}!`);

    for (const [_, channel] of client.channels) {
        if (channel.type === "text") {
            try {
                await (channel as Discord.TextChannel).fetchMessages({limit: 100});
            } catch {}
        }
    }

    // Start looped jobs
    alertDiskSize(client);

    client.on("message", async (message) => {
        if (message.content.startsWith("^checkdiskusage")) {
            checkDiskUsageCommand(client);
        }
    })

    client.on("messageReactionAdd", async (messageReaction, user) => {
        await messageReactionAddRemove(client, logger, messageReaction, user, ReactionAction.Added);
    });

    client.on("messageReactionRemove", async (messageReaction, user) => {
        await messageReactionAddRemove(client, logger, messageReaction, user, ReactionAction.Removed);
    });
});