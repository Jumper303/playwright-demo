import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

type EnvConfig = {
  PURCHASE_BASE_URL: string | undefined;
};

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(rootDir, "..", ".env");
const { parsed } = dotenv.config({ path: envPath });
if (parsed) {
  process.env = { ...process.env, ...parsed };
}

export function envConfig(): EnvConfig {
  switch (process.env.TEST_ENV) {
    case "DEV":
    case "STAGING":
    case "PROD":
      return {
        PURCHASE_BASE_URL: parsed?.PURCHASE_BASE_URL ?? "https://www.saucedemo.com/",
      };
    default:
      throw new Error(
        `Invalid environment: ${process.env.TEST_ENV}. Please set TEST_ENV environment variable to DEV, STAGING, or PROD.`,
      );
  }
}
