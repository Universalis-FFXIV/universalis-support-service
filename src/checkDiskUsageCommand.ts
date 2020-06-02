import { checkDiskUsage } from "./checkDiskUsage";
import { Client, TextChannel } from "discord.js";

const { alertChannelId } = require("../config.json");

export function checkDiskUsageCommand(client: Client) {
    const alertChannel = client.channels.get(alertChannelId)! as TextChannel;

    checkDiskUsage(async (err, deviceList) => {
        console.log("All done!");
        if (!err) {
            for (const device in deviceList) {
                if (deviceList[device] > 10) {
                    await alertChannel.send(`Device ${device} is almost out of storage space! Current disk usage: ${deviceList[device]}%`);
                }
            }
        } else {
            await alertChannel.send(`Error: ${err.message}`);
        }
    });
};