import db from "../drizzle/db";
import { StateTable } from "../drizzle/schema";

export const cityService = async () => {
  return await db.query.StateTable.findMany({});
};