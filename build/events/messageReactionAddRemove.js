"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReactionAction_1 = require("../types/ReactionAction");
const { apiPingEmoteId, apiPingRoleId } = require.main.require("../config.json");
function messageReactionAddRemove(client, logger, messageReaction, user, action) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!messageReaction.message.guild || user.equals(client.user))
            return;
        const guild = messageReaction.message.guild;
        if (messageReaction.emoji.id === apiPingEmoteId) {
            const member = yield guild.fetchMember(user);
            const apiPingRole = guild.roles.get(apiPingRoleId);
            if (action === ReactionAction_1.ReactionAction.Added) {
                yield member.addRole(apiPingRole);
                logger.info(`Added ${member.user.username} to ${apiPingRole.name}`);
            }
            else {
                yield member.removeRole(apiPingRole);
                logger.info(`Removed ${member.user.username} to ${apiPingRole.name}`);
            }
        }
    });
}
exports.messageReactionAddRemove = messageReactionAddRemove;
