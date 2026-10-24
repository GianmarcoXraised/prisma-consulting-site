// Runs once when the production server starts (Next.js instrumentation hook). The Node-only work
// lives in instrumentation-node.ts so the edge bundle never sees fs/crypto.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./instrumentation-node");
  }
}
