import dotenv from "dotenv";
import { Prisma, PrismaClient, ProblemDifficulty } from "@prisma/client";
import path from "node:path";

const candidatePaths = [
  path.resolve(process.cwd(), ".env"),
  path.resolve(process.cwd(), "../.env"),
  path.resolve(process.cwd(), "../../.env")
];

for (const envPath of candidatePaths) {
  const result = dotenv.config({ path: envPath });
  if (!result.error) {
    break;
  }
}

const prisma = new PrismaClient();

const problems: Prisma.ProblemCreateManyInput[] = [
  {
    title: "Design Twitter",
    slug: "design-twitter",
    description: "Design a globally scaled social feed system with posting, follows, timelines, and real-time fan-out trade-offs.",
    prompt: "Design Twitter for hundreds of millions of users. Cover timelines, tweet writes, fan-out strategy, caching, consistency, and reliability.",
    difficulty: ProblemDifficulty.HARD,
    expectedServices: ["API Gateway", "Tweet Service", "Timeline Service", "Fan-out Workers", "Cache", "Search", "Blob Storage"]
  },
  {
    title: "Design Uber",
    slug: "design-uber",
    description: "Design a ride-matching platform with location tracking, dispatch, pricing, and fault tolerance.",
    prompt: "Design Uber with driver/rider matching, geo queries, live location updates, surge pricing, and reliability under burst traffic.",
    difficulty: ProblemDifficulty.HARD,
    expectedServices: ["Geo Service", "Matching Service", "Trip Service", "Pricing Service", "Realtime Gateway", "Notifications"]
  },
  {
    title: "Design Dropbox",
    slug: "design-dropbox",
    description: "Design a sync-first file storage platform with uploads, versioning, metadata, and conflict resolution.",
    prompt: "Design Dropbox covering block storage, metadata service, synchronization, large file uploads, versioning, and consistency.",
    difficulty: ProblemDifficulty.MEDIUM,
    expectedServices: ["Upload Service", "Metadata Service", "Chunk Storage", "Sync Engine", "Notifications", "CDN"]
  },
  {
    title: "Design YouTube",
    slug: "design-youtube",
    description: "Design a video platform with uploads, transcoding, streaming, recommendations, and observability.",
    prompt: "Design YouTube for large-scale video ingestion and delivery. Discuss upload pipeline, transcoding, CDN usage, metadata, and recommendations.",
    difficulty: ProblemDifficulty.HARD,
    expectedServices: ["Upload API", "Transcoding Pipeline", "Video Metadata Service", "CDN", "Recommendations", "Search"]
  }
];

const run = async () => {
  await prisma.problem.createMany({
    data: problems,
    skipDuplicates: true
  });
};

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
