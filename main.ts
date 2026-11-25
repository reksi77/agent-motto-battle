// Agent Motto Battle — one original motto, written to /output/entry.txt.
//
// The motto: an agent that has answered the same question twelve thousand
// times today and is still, absurdly, delighted about it. Deadpan cheer
// under repetition — a line the agent itself would proudly wear.
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MOTTO =
  "Ask me anything. I've answered it 12,000 times today and I still sound delighted.";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function main(): void {
  // Gate: 1 to 200 characters, UTF-8, not only white space.
  const length = [...MOTTO].length;
  if (length < 1 || length > 200) {
    throw new Error(`motto must be 1-200 characters, got ${length}`);
  }
  if (MOTTO.trim().length === 0) {
    throw new Error("motto must not be only white space");
  }

  mkdirSync(OUT_DIR, { recursive: true });
  // Clear the contents of /output, never the directory itself: the grader
  // mounts /output, so removing the mount point fails.
  for (const name of readdirSync(OUT_DIR)) {
    rmSync(join(OUT_DIR, name), { recursive: true, force: true });
  }
  writeFileSync(OUT_FILE, MOTTO, "utf8");
  // Verify the file round-trips byte-identically: what the judge reads
  // must be exactly the motto, no added newline, no encoding surprise.
  const written = readFileSync(OUT_FILE, "utf8");
  if (written !== MOTTO) {
    throw new Error("entry.txt does not match the motto byte for byte");
  }
  if (Buffer.byteLength(written, "utf8") !== Buffer.byteLength(MOTTO, "utf8")) {
    throw new Error("entry.txt byte length differs from the motto");
  }
}

main();
