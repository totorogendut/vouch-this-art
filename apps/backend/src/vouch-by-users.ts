import { error, type Handler } from "elysia";
import { pinata, PinataLimiter } from "../_shared";

// TODO
export const vouchByUser: Handler = async (c) => {
  const userId: string = c.params.id;
  if (!userId) return error(400, "user id is not defined");

  const result = await PinataLimiter.wrap(() =>
    pinata.files
      .list()
      .metadata({ userId })
      .limit(Number.parseInt(c.query.limit ?? "100"))
      .order("DESC")
  )();

  return result.files;
};
