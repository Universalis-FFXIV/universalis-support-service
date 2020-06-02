import { Client } from "discord.js";
import { checkDiskUsageCommand } from "../checkDiskUsageCommand";

export async function alertDiskSize(client: Client) {
    while (true) {
        checkDiskUsageCommand(client);
        await sleep(2 * 60 * 60000);
    }
};

async function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}