import fs from "node:fs";

export function addLog(log_file: string,new_log: string): void{
    fs.writeFile(log_file, new_log, {flag: 'a'}, err => {});
} 
