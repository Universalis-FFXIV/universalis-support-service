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
const checkDiskUsage_1 = require("./checkDiskUsage");
const { alertChannelId } = require("../config.json");
function checkDiskUsageCommand(client) {
    const alertChannel = client.channels.get(alertChannelId);
    checkDiskUsage_1.checkDiskUsage((err, deviceList) => __awaiter(this, void 0, void 0, function* () {
        console.log("All done!");
        if (!err) {
            for (const device in deviceList) {
                if (deviceList[device] > 10) {
                    yield alertChannel.send(`Device ${device} is almost out of storage space! Current disk usage: ${deviceList[device]}%`);
                }
            }
        }
        else {
            yield alertChannel.send(`Error: ${err.message}`);
        }
    }));
}
exports.checkDiskUsageCommand = checkDiskUsageCommand;
;
