// IndexNow at server start: submit the pages this deploy changed, and watch for scheduled press
// releases going live (lib/indexnow.ts). Only on Railway, never during a build or a local `next start`.
import { submitDeployChanges, watchScheduledReleases } from "./lib/indexnow";

if (process.env.NEXT_PHASE !== "phase-production-build" && process.env.RAILWAY_DEPLOYMENT_ID) {
  watchScheduledReleases();
  void submitDeployChanges();
}
