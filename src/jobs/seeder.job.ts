import cron from "node-cron";
import { runCommand } from "../utils/run-command";

export const seederJob = cron.schedule("15 5 * * *", async () => {
  (async () => {
    try {
      const output = await runCommand("pnpm seed");
      console.log("✅ Success:", output);
    } catch (err: any) {
      console.error("❌ Failed:", err.message);
    }
  })();
});
