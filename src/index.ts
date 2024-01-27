import { Client } from "pg";

export interface Env {
  DB_URL: string;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const client = new Client(env.DB_URL);
    await client.connect();

    // Query the products table
    const result = await client.query("SELECT * FROM products");

    // Return the result as JSON
    const resp = new Response(JSON.stringify(result.rows), {
      headers: { "Content-Type": "application/json" },
    });

    // Clean up the client
    ctx.waitUntil(client.end());
    return resp;
  },
};
