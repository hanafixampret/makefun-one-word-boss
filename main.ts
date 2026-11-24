import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "Ghost";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) throw new Error("round-trip mismatch");
if (ENTRY.length < 1 || ENTRY.length > 30) {
  throw new Error(`entry length ${ENTRY.length} outside 1-30`);
}
if (ENTRY.trim().length === 0) throw new Error("entry is blank");
if (ENTRY !== ENTRY.trim()) throw new Error("entry has surrounding whitespace");
if (/\s/.test(ENTRY)) throw new Error("entry must be a single word");
console.log(`wrote ${outPath} (${ENTRY.length} chars)`);
