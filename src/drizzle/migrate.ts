import "dotenv/config"
import { migrate } from "drizzle-orm/node-postgres/migrator"

import db, { client } from "./db"

async function migration() {
    console.log("==========================migration started=============================")
    await migrate(db, {migrationsFolder: __dirname + "/migrations"})
    await client.end()
    console.log("===================migration ended==================")
    process.exit(0)

}

migration().catch((err) => {
    console.error(err)
    process.exit(0)
})
