// import { Client } from "pg";
// import * as dotenv from "dotenv";
// import postgres from "postgres";

// // ✅ Load .env.local or .env file
// dotenv.config({ path: ".env.local" });

// // ✅ Create PostgreSQL client
// // const client = new Client({
// //   connectionString: process.env.DATABASE_URL,
// //   ssl: { rejectUnauthorized: false },
// //   ipv6: false 
// // });
// dotenv.config({ path: ".env.local" });
// const client = postgres(process.env.DATABASE_URL!, {
//   ssl: { rejectUnauthorized: false },
//   host: "db.your-supabase-id.supabase.co", // Optional, explicitly define
//   ipv6: false                              // 👈 इससे IPv6 disable होगा
// });

// async function testConnection() {
//   try {
//     await client.connect();
//     console.log("✅ Database connection successful!");
//   } catch (error: any) {
//     console.error("❌ Database connection failed:", error.message);
//   } finally {
//     await client.end();
//   }
// }

// // ✅ Run the test
// testConnection();


import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = postgres(process.env.DATABASE_URL!, {
  ssl: { rejectUnauthorized: false },
  host: "db.cxtcuhclovblzcjkzxwk.supabase.co",
  // ipv6: false 
});

async function testConnection() {
  try {
    await client`SELECT 1`;
    console.log("✅ Database connection successful!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  } finally {
    await client.end();
  }
}

testConnection();