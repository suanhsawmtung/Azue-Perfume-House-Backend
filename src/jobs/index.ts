import { maintenanceJob } from "./maintenance.job";
import { seederJob } from "./seeder.job";

export const startCronJobs = () => {
  maintenanceJob.start();
  seederJob.start();
};
