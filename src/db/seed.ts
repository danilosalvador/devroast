import { faker } from "@faker-js/faker";
import { db } from "./index";
import { roasts } from "./schema";

const languages = [
  "javascript",
  "typescript",
  "python",
  "go",
  "rust",
  "java",
  "csharp",
  "php",
  "html",
  "css",
  "sql",
] as const;

const roastModes = ["brutal", "sarcasm"] as const;

async function seed() {
  console.log("🌱 Seeding database...");

  // Clear existing roasts to avoid pollution (optional, but good for repeatable seeds)
  // await db.delete(roasts);

  const data = Array.from({ length: 100 }).map(() => ({
    codeContent: faker.lorem.paragraphs(2),
    language: faker.helpers.arrayElement(languages),
    mode: faker.helpers.arrayElement(roastModes),
    score: faker.number
      .float({ min: 0, max: 10, fractionDigits: 1 })
      .toString(),
    roastText: faker.lorem.sentence(),
    createdAt: faker.date.past(),
  }));

  try {
    await db.insert(roasts).values(data);
    console.log("✅ Seed completed: 100 roasts inserted.");
  } catch (error) {
    console.error("❌ Seed failed:", error);
  } finally {
    process.exit(0);
  }
}

seed();
