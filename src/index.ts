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

    // Get the request properties
    let payload = await request.json();
    let ipv4 = request.headers.get("cf-connecting-ip");
    let ipv6 = request.headers.get("cf-ipcountry");
    let current_url = request.url;
    let referring_url = request.headers.get("Referer");
    let request_time = new Date();

    // Create a SQL query to insert the values into the table
    let sql = `INSERT INTO requests (payload, ipv4, ipv6, current_url, referring_url, request_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    let values = [payload, ipv4, ipv6, current_url, referring_url, request_time];

    const db_response = await client.query(sql, values);

    // Return the result as JSON
    const resp = new Response(JSON.stringify(db_response.rows), {
      headers: { "Content-Type": "application/json" },
    });

    // Clean up the client
    ctx.waitUntil(client.end());
    return resp;
  }
};
