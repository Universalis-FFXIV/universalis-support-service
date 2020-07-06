"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDiskUsageCommand = void 0;
const checkDiskUsage_1 = require("./checkDiskUsage");
const { alertChannelId } = require("../config.json");
function checkDiskUsageCommand(client) {
    const alertChannel = client.channels.get(alertChannelId);
    checkDiskUsage_1.checkDiskUsage((err, deviceList) => {
        if (!err) {
            for (const device in deviceList) {
                if (deviceList[device] > 90) {
                    alertChannel.send(`Device ${device} is almost out of storage space! Current disk usage: ${deviceList[device]}%`);
                }
            }
        }
        else {
            alertChannel.send(`Error: ${err.message}`);
        }
    });
}
exports.checkDiskUsageCommand = checkDiskUsageCommand;
;
