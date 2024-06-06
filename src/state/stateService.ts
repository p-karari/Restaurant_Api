import db from "../drizzle/db";
import { StateTable } from "../drizzle/schema";

export const stateService = async () => {
  return await db.query.StateTable.findMany({});
};