import { Client } from "pg";

const client = new Client(process.env.POSTGRES_URL);

export default client;
