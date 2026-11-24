import { z } from "zod";
import { COURSE_STAGES } from "../course";
import { LIBRARY } from "../library";
import { UPCOMING_LIVES } from "../lives";
import { DISCARDED, LAUNCH_HOURS, MILESTONES } from "../public-numbers";
import {
  discardedSchema,
  launchStageSchema,
  libraryPieceSchema,
  liveEventSchema,
  milestoneSchema,
  socialPostSchema,
  workshopSchema,
} from "../schema";
import { SOCIAL_POSTS } from "../social-posts";
import { WORKSHOPS } from "../workshops";

const cases = [
  ["library", z.array(libraryPieceSchema), LIBRARY],
  ["workshops", z.array(workshopSchema), WORKSHOPS],
  ["milestones", z.array(milestoneSchema), MILESTONES],
  ["launch hours", z.array(launchStageSchema), LAUNCH_HOURS],
  ["discarded ideas", z.array(discardedSchema), DISCARDED],
  ["upcoming lives", z.array(liveEventSchema), UPCOMING_LIVES],
  ["social posts", z.array(socialPostSchema), SOCIAL_POSTS],
] as const;

describe("content", () => {
  it.each(cases)("%s matches its schema", (_name, schema, data) => {
    expect(() => schema.parse(data)).not.toThrow();
  });

  it("uses unique ids so they can be used as anchors and keys", () => {
    for (const list of [LIBRARY, WORKSHOPS]) {
      const ids = list.map((item) => item.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("tracks launch hours for every course stage", () => {
    expect(LAUNCH_HOURS.map((h) => h.stage)).toEqual(COURSE_STAGES.map((s) => s.title));
  });

  it("highlights exactly one workshop", () => {
    expect(WORKSHOPS.filter((w) => w.featured)).toHaveLength(1);
  });
});
