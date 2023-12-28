import fs from "node:fs";
export function addLog(log_file, new_log) {
    fs.writeFile(log_file, new_log, { flag: 'a' }, err => { });
}
//# sourceMappingURL=managelog.js.map