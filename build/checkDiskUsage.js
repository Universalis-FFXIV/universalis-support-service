"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDiskUsage = void 0;
const child_process_1 = require("child_process");
/** Returns an object of disk usage values, with percentage outputs. */
function checkDiskUsage(fn) {
    child_process_1.exec("df -H", (err, stdout) => {
        if (err) {
            fn(err, null);
            return;
        }
        const deviceList = {};
        const lines = stdout.split(/\n|\r/g);
        lines.shift();
        for (const line of lines) {
            const words = line.split(/\s+/g);
            if (!words[4])
                continue;
            deviceList[words[5]] = parseInt(words[4].substr(0, words[4].length - 1));
        }
        fn(null, deviceList);
    });
}
exports.checkDiskUsage = checkDiskUsage;
