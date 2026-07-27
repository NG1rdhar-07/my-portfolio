import fs from "node:fs";
import path from "node:path";

const PROJECT_ROOT = process.argv[2] || process.cwd();

const rootConfigFiles = [
  "package.json",
  "tsconfig.json",
  "vite.config.ts",
  "eslint.config.js",
  ".gitignore",
  ".prettierrc",
  ".prettierignore",
  "components.json",
  "bunfig.toml",
  "vercel.json",
  ".env.example",
  "README.md",
  "AGENTS.md",
];

function walkDir(dir, extensions, acc = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(full, extensions, acc);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (extensions.includes(ext)) {
        acc.push(full);
      }
    }
  }
  return acc;
}

function toPosix(p) {
  return p.split(path.sep).join("/");
}

function relPosix(absPath) {
  return toPosix(path.relative(PROJECT_ROOT, absPath));
}

const files = [];

for (const f of rootConfigFiles) {
  const abs = path.join(PROJECT_ROOT, f);
  if (fs.existsSync(abs)) {
    files.push({
      file: f,
      data: fs.readFileSync(abs, "utf-8"),
    });
  } else {
    console.warn("WARN: missing root config file:", f);
  }
}

const srcFiles = walkDir(path.join(PROJECT_ROOT, "src"), [".ts", ".tsx", ".css"]);
for (const abs of srcFiles) {
  files.push({
    file: relPosix(abs),
    data: fs.readFileSync(abs, "utf-8"),
  });
}

const faviconAbs = path.join(PROJECT_ROOT, "public", "favicon.ico");
if (fs.existsSync(faviconAbs)) {
  const buf = fs.readFileSync(faviconAbs);
  files.push({
    file: "public/favicon.ico",
    data: buf.toString("base64"),
    encoding: "base64",
  });
} else {
  console.warn("WARN: missing public/favicon.ico");
}

const payload = {
  target: "production",
  name: "noor-portfolio",
  teamId: "team_t86QIX3yN1MDCvActZWCtctv",
  projectSettings: {
    framework: null,
    buildCommand: "npm run build",
    installCommand: "npm install",
    outputDirectory: ".vercel/output",
    rootDirectory: null,
  },
  files,
};

console.log(`Collected ${files.length} files.`);
const outPath = path.join(PROJECT_ROOT, "deploy-payload.json");
fs.writeFileSync(outPath, JSON.stringify(payload, null, 0));
console.log(`Wrote payload to: ${outPath}`);
console.log(`Total size (bytes): ${fs.statSync(outPath).size.toLocaleString()}`);
