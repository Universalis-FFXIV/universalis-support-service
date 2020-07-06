"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = __importStar(require("discord.js"));
const Winston = __importStar(require("winston"));
const messageReactionAddRemove_1 = require("./events/messageReactionAddRemove");
const ReactionAction_1 = require("./types/ReactionAction");
const checkDiskUsageCommand_1 = require("./checkDiskUsageCommand");
const checkLanguageStatusCommand_1 = require("./checkLanguageStatusCommand");
const alertDiskSize_1 = require("./cronjobs/alertDiskSize");
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
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    logger.info(`Logged in as ${client.user.username}!`);
    for (const [_, channel] of client.channels) {
        if (channel.type === "text") {
            try {
                yield channel.fetchMessages({ limit: 100 });
            }
            catch (_a) { }
        }
    }
    // Start looped jobs
    alertDiskSize_1.alertDiskSize(client);
    client.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
        if (message.content.startsWith("^checkdiskusage")) {
            checkDiskUsageCommand_1.checkDiskUsageCommand(client);
        }
        else if (message.content.startsWith("^checklanguagestatus")) {
            checkLanguageStatusCommand_1.checkLanguageStatusCommand(client, message.channel);
        }
    }));
    client.on("messageReactionAdd", (messageReaction, user) => __awaiter(void 0, void 0, void 0, function* () {
        yield messageReactionAddRemove_1.messageReactionAddRemove(client, logger, messageReaction, user, ReactionAction_1.ReactionAction.Added);
    }));
    client.on("messageReactionRemove", (messageReaction, user) => __awaiter(void 0, void 0, void 0, function* () {
        yield messageReactionAddRemove_1.messageReactionAddRemove(client, logger, messageReaction, user, ReactionAction_1.ReactionAction.Removed);
    }));
}));
