import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = process.argv[2] || process.cwd();

async function main() {
  const payloadPath = path.join(PROJECT_ROOT, "deploy-payload.json");
  if (!fs.existsSync(payloadPath)) {
    console.error("deploy-payload.json not found. Run build-deploy-payload.mjs first.");
    process.exit(1);
  }

  const payload = JSON.parse(fs.readFileSync(payloadPath, "utf-8"));

  let token = process.env.VERCEL_TOKEN
    || process.env.VERCEL_API_TOKEN
    || null;

  if (!token) {
    const candidates = [
      path.join(process.env.HOME || process.env.USERPROFILE || "", ".vercel", "auth.json"),
      path.join(process.env.HOME || process.env.USERPROFILE || "", ".config", "vercel", "auth.json"),
      path.join(process.env.APPDATA || "", "..", "Local", "Vercel", "auth.json"),
    ];
    for (const c of candidates) {
      try {
        if (fs.existsSync(c)) {
          const data = JSON.parse(fs.readFileSync(c, "utf-8"));
          token = data.token || null;
          if (token) {
            console.log(`Found Vercel token in: ${c}`);
            break;
          }
        }
      } catch {}
    }
  }

  if (!token) {
    console.error("ERROR: No Vercel auth token found.");
    console.error("Set VERCEL_TOKEN env var, or log in with `npx vercel login`.");
    console.error("Alternatively, set token via: export VERCEL_TOKEN=<your-token>");
    process.exit(2);
  }

  console.log(`Token found. Deploying ${payload.files.length} files to team ${payload.teamId}...");
  console.log(`Project name: ${payload.name}, target: ${payload.target}`);

  const query = new URLSearchParams();
  if (payload.teamId) query.set("teamId", payload.teamId);

  const url = `https://api.vercel.com/v13/deployments?${query.toString()}`;

  const body = {
    name: payload.name,
    target: payload.target,
    files: payload.files,
    projectSettings: payload.projectSettings,
  };

  console.log("POST", url);
  console.log("Body size (bytes):", JSON.stringify(body).length.toLocaleString());

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }

  console.log("\n=== Response Status ===");
  console.log(res.status, res.statusText);

  if (!res.ok) {
    console.error("\n=== ERROR ===");
    console.error(JSON.stringify(data, null, 2));
    process.exit(3);
  }

  console.log("\n=== Deployment Result ===");
  console.log(JSON.stringify(data, null, 2));

  const out = {
    deploymentId: data.id,
    url: data.url ? `https://${data.url}` : undefined,
    project: data.name,
    teamId: payload.teamId,
    full: data,
  };

  console.log("\n=== Summary ===");
  console.log("Deployment ID:", out.deploymentId);
  console.log("URL:", out.url);
  fs.writeFileSync(
    path.join(PROJECT_ROOT, "deployment-result.json"),
    JSON.stringify(out, null, 2),
  );
  console.log("Wrote deployment-result.json");
}

main().catch((e) => {
  console.error("Unhandled error:", e);
  process.exit(99);
};
