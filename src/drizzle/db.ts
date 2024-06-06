 import "dotenv/config";
 import * as schema from "./schema";
 import { Client } from "pg";
 import {drizzle} from "drizzle-orm/node-postgres";

 export const client = new Client({
    connectionString: process.env.DB_URL as string,
 })

 const main = async() => {
    await client.connect()
 }

 main();
 const db = drizzle(client, { schema, logger: true });
 export default db;
 