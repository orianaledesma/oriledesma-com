import { z } from "zod";

/**
 * Esquemas del contenido estático. Un test valida todos los archivos de /content:
 * si alguien carga una pieza mal (un nivel inexistente, un pilar con typo), falla el CI.
 */
export const pillar = z.enum(["desde-cero", "sistema"]);
export const level = z.enum(["0", "1", "2", "3"]);
export const postTone = z.enum(["blanco", "marino", "celeste"]);
const pending = z.literal("pending");

export const socialPostSchema = z.object({ tag: z.string(), title: z.string(), tone: postTone });

export const libraryPieceSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  pillar,
  level,
  withNumbers: z.boolean(),
  format: z.string(),
  tag: z.string(),
  tone: postTone,
  /** URL real o "pending" mientras no esté publicada. */
  url: z.union([z.url(), pending]),
});

export const workshopSchema = z.object({
  id: z.string(),
  icon: z.enum(["chat", "gear", "social", "browser"]),
  title: z.string(),
  level: z.string(),
  audience: z.string(),
  format: z.string(),
  outcome: z.string(),
  featured: z.boolean(),
});

export const milestoneSchema = z.object({
  title: z.string(),
  description: z.string(),
  reachedOn: z.union([z.iso.date(), pending]),
});

export const launchStageSchema = z.object({
  stage: z.string(),
  estimatedHours: z.union([z.number().nonnegative(), pending]),
  actualHours: z.union([z.number().nonnegative(), pending]),
});

export const discardedSchema = z.object({
  area: z.string(),
  title: z.string(),
  problem: z.string(),
  change: z.string(),
});

export const liveEventSchema = z.object({
  date: z.union([z.iso.date(), pending]),
  title: z.string(),
  detail: z.string(),
  detailPending: z.boolean(),
  kind: z.enum(["consultoria", "curso"]),
});

export type LibraryPiece = z.infer<typeof libraryPieceSchema>;
export type Pillar = z.infer<typeof pillar>;
export type Level = z.infer<typeof level>;
export type Workshop = z.infer<typeof workshopSchema>;
export type Milestone = z.infer<typeof milestoneSchema>;
export type LaunchStage = z.infer<typeof launchStageSchema>;
export type Discarded = z.infer<typeof discardedSchema>;
export type LiveEvent = z.infer<typeof liveEventSchema>;
export type SocialPost = z.infer<typeof socialPostSchema>;
