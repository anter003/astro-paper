import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";

export const ARTICLE_PATH = "src/data/articles";

const projects = defineCollection({
  loader: glob({ pattern: "**/s.json", base: `./${ARTICLE_PATH}` }),
  schema: () =>
    z.object({
      seriesNo: z.number(),
      title: z.string(),
      desc: z.string().optional(),
      draft: z.boolean().default(false)
    }),
});

const docs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: `./${ARTICLE_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date().optional().nullable(),
      title: z.string(),
      series: z.number(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      desc: z.string(),
    }),
});

export const collections = { docs, projects };
