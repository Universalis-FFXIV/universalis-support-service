import { MessageReaction, Role, User } from "discord.js";
import { ReactionAction } from "../types/ReactionAction";

const { apiPingEmoteId, apiPingRoleId } = require("config.json");

export async function messageReactionAddRemove(messageReaction: MessageReaction, user: User, action: ReactionAction) {
    if (!messageReaction.message.guild) return;

    const guild = messageReaction.message.guild;

    if (messageReaction.emoji.id === apiPingEmoteId) {
        const member = await guild.fetchMember(user);
        const apiPingRole = guild.roles.get(apiPingRoleId) as Role;

        if (action === ReactionAction.Added) {
            await member.addRole(apiPingRole);
            global.logger.info(`Added ${member.nickname} to ${apiPingRole.name}`);
        } else {
            await member.removeRole(apiPingRole);
            global.logger.info(`Removed ${member.nickname} to ${apiPingRole.name}`);
        }
    }
}