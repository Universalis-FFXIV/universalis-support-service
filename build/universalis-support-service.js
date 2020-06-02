"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = __importStar(require("discord.js"));
const Winston = __importStar(require("winston"));
const messageReactionAddRemove_1 = require("./events/messageReactionAddRemove");
const ReactionAction_1 = require("./types/ReactionAction");
const checkDiskUsageCommand_1 = require("./checkDiskUsageCommand");
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
    .then(() => __awaiter(this, void 0, void 0, function* () {
    logger.info(`Logged in as ${client.user.username}!`);
    for (const [_, channel] of client.channels) {
        if (channel.type === "text") {
            try {
                yield channel.fetchMessages({ limit: 100 });
            }
            catch (_a) { }
        }
    }
    client.on("message", (message) => __awaiter(this, void 0, void 0, function* () {
        if (message.content.startsWith("^checkdiskusage")) {
            checkDiskUsageCommand_1.checkDiskUsageCommand(client);
        }
    }));
    client.on("messageReactionAdd", (messageReaction, user) => __awaiter(this, void 0, void 0, function* () {
        yield messageReactionAddRemove_1.messageReactionAddRemove(client, logger, messageReaction, user, ReactionAction_1.ReactionAction.Added);
    }));
    client.on("messageReactionRemove", (messageReaction, user) => __awaiter(this, void 0, void 0, function* () {
        yield messageReactionAddRemove_1.messageReactionAddRemove(client, logger, messageReaction, user, ReactionAction_1.ReactionAction.Removed);
    }));
}));
