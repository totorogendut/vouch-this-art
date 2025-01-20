import { error, type Handler } from "elysia";
import { pinata, PinataLimiter } from "../_shared";

export const list: Handler = async (c) => {
  const { hash } = c.params;
  if (!hash) return error(400, "not found");

  try {
    const result = await PinataLimiter.wrap(() =>
      pinata.files
        .list()
        .metadata({ hash })
        .limit(Number.parseInt(c.query.limit ?? "100"))
        .order("DESC")
    )();

    return result.files;
  } catch (err) {
    return c.error(500, "Internal Server Error");
  }
};
