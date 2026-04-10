import { publicProcedure, router } from "../trpc";
import { roasts } from "../../db/schema";
import { count, avg } from "drizzle-orm";

export const roastRouter = router({
  getMetrics: publicProcedure.query(async ({ ctx }) => {
    const results = await ctx.db
      .select({
        total: count(roasts.id),
        averageScore: avg(roasts.score),
      })
      .from(roasts);

    const metrics = results[0];

    return {
      total: metrics.total ?? 0,
      averageScore: metrics.averageScore ? Number.parseFloat(metrics.averageScore) : 0,
    };
  }),
});
