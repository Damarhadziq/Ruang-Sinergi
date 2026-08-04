import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const configPath = resolve("dist/server/wrangler.json");
const config = JSON.parse(await readFile(configPath, "utf8"));

delete config.compatibility_flags;

await writeFile(configPath, `${JSON.stringify(config)}\n`, "utf8");
