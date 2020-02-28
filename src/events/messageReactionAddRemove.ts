import { Client, MessageReaction, Role, User } from "discord.js";
import { ReactionAction } from "../types/ReactionAction";

const { apiPingEmoteId, apiPingRoleId } = (require.main as NodeJS.Module).require("../config.json");

export async function messageReactionAddRemove(client: Client, messageReaction: MessageReaction, user: User, action: ReactionAction) {
    if (!messageReaction.message.guild || user.equals(client.user)) return;

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