import { Client } from "pg";

const client = new Client({
  user: "testing_owner",
  host: "ep-green-wave-a88qj4bc-pooler.eastus2.azure.neon.tech",
  database: "testing",
  password: "npg_ZkU2JKbCV5pW",
  port: 5432,
  ssl: true,
});

export default client;
