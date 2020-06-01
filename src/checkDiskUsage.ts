import { exec } from "child_process";

/** Returns an object of disk usage values, with percentage outputs. */
export function checkDiskUsage(fn: (err: Error | null, deviceList: { [key: string]: number } | null) => void) {
	exec("", (err, stdout) => {
		if (err) {
			fn(err, null);
			return;
		}

		const deviceList: { [key: string]: number } = {};
		const lines = stdout.split(/\v/g);
		lines.shift();
		for (const line of lines) {
			const words = line.split(/\s+/g);
			Object.defineProperty(
				deviceList,
				words[5],
				parseInt(words[4].substr(0, words[4].length - 1)),
			);
		}

		fn(null, deviceList)
	});
}
